import { ParserResult } from "./ParserResult.js";

export class LightsParser {
    static parse(node, reader) {
        const children = node.children;

        let errors = [];

        let lights = [];
        let numLights = 0;

        let grandChildren = [];
        let nodeNames = [];

        // Any number of lights.
        for (let i = 0; i < children.length; i++) {

            // Storing light information
            let global = [];
            let attributeNames = [];
            let attributeTypes = [];

            //Check type of light
            if (children[i].nodeName != "omni" && children[i].nodeName != "spot") {
                errors.push("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            else {
                attributeNames.push(...["location", "ambient", "diffuse", "specular"]);
                attributeTypes.push(...["position", "color", "color", "color"]);
            }

            // Get id of the current light.
            let lightId = reader.getString(children[i], 'id');
            if (lightId == null) {
                errors.push("no ID defined for light");
                continue;
            }

            // Checks for repeated IDs.
            if (lights[lightId] != null) {
                errors.push("ID must be unique for each light (conflict: id= " + lightId + ")");
                continue;
            }

            // Light enable/disable
            let enableLight = true;
            var aux = reader.getBoolean(children[i], 'enabled');
            if (!(aux != null && !isNaN(aux) && (aux == true || aux == false)))
                errors.push("unable to parse value component of the 'enable light' field for id= " + lightId + "; assuming 'value = 1'");

            enableLight = aux && 1;

            //Add enabled boolean and type name to light info
            global.push(enableLight);
            global.push(children[i].nodeName);

            grandChildren = children[i].children;
            // Specifications for the current light.

            nodeNames = [];
            for (let j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }


            let hasUndefinedAttribute = false;
            for (let j = 0; j < attributeNames.length; j++) {
                let attributeIndex = nodeNames.indexOf(attributeNames[j]);


                if (attributeIndex != -1) {
                    if (attributeTypes[j] == "position")
                        var aux = this.parseCoordinates4D(grandChildren[attributeIndex], reader, "light position for ID" + lightId);
                    else
                        var aux = this.parseColor(grandChildren[attributeIndex], reader, attributeNames[j] + " illumination for ID" + lightId);

                    if (!Array.isArray(aux)){
                        errors.push("light attribute " + attributeNames[j] + " undefined for id=" + lightId);
                        hasUndefinedAttribute = true;
                        continue;
                    }


                    global.push(aux);
                }
                else {
                    errors.push("light " + attributeNames[i] + " undefined for id=" + lightId);
                    hasUndefinedAttribute = true;
                }
            }
            if(hasUndefinedAttribute) {
                continue;
            }

            // Gets the additional attributes of the spot light
            if (children[i].nodeName == "spot") {
                var angle = reader.getFloat(children[i], 'angle');
                if (!(angle != null && !isNaN(angle))) {
                    errors.push("unable to parse angle of the light for id= " + lightId);
                    continue;
                }

                var exponent = reader.getFloat(children[i], 'exponent');
                if (!(exponent != null && !isNaN(exponent))) {
                    errors.push("unable to parse exponent of the light for id= " + lightId);
                    continue;
                }

                let targetIndex = nodeNames.indexOf("target");

                // Retrieves the light target.
                var targetLight = [];
                if (targetIndex != -1) {
                    let aux = this.parseCoordinates3D(grandChildren[targetIndex], reader, "target light for ID " + lightId);
                    if (!Array.isArray(aux)){
                        errors.push(aux);
                        continue;
                    }


                    targetLight = aux;
                }
                else {
                    errors.push("light target undefined for id= " + lightId);
                    continue;
                }

                global.push(...[angle, exponent, targetLight])
            }

            lights[lightId] = global;
            numLights++;
        }

        if (numLights == 0)
            errors.push("at least one light must be defined");
        else if (numLights > 8)
            errors.push("too many lights defined; WebGL imposes a limit of 8 lights");

        return new ParserResult(lights, errors);
    }

    /**
     * Parse the coordinates from a node with id=id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
    */
    static parseCoordinates3D(node, reader, messageError) {
        var position = [];

        // x
        var x = reader.getFloat(node, 'x');
        if (!(x != null && !isNaN(x)))
            return "unable to parse x-coordinate of the " + messageError;

        // y
        var y = reader.getFloat(node, 'y');
        if (!(y != null && !isNaN(y)))
            return "unable to parse y-coordinate of the " + messageError;

        // z
        var z = reader.getFloat(node, 'z');
        if (!(z != null && !isNaN(z)))
            return "unable to parse z-coordinate of the " + messageError;

        position.push(...[x, y, z]);

        return position;
    }

    /**
     * Parse the coordinates from a node with id=id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    static parseCoordinates4D(node, reader, messageError) {
        var position = [];

        //Get x, y, z
        position = this.parseCoordinates3D(node, reader, messageError);

        if (!Array.isArray(position))
            return position;


        // w
        var w = reader.getFloat(node, 'w');
        if (!(w != null && !isNaN(w)))
            return "unable to parse w-coordinate of the " + messageError;

        position.push(w);

        return position;
    }

    /**
     * Parse the color components from a node
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    static parseColor(node, reader, messageError) {
        var color = [];

        // R
        var r = reader.getFloat(node, 'r');
        if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
            return "unable to parse R component of the " + messageError;

        // G
        var g = reader.getFloat(node, 'g');
        if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
            return "unable to parse G component of the " + messageError;

        // B
        var b = reader.getFloat(node, 'b');
        if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
            return "unable to parse B component of the " + messageError;

        // A
        var a = reader.getFloat(node, 'a');
        if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
            return "unable to parse A component of the " + messageError;

        color.push(...[r, g, b, a]);

        return color;
    }
}