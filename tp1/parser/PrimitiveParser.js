import { ParserResult } from "./ParserResult";
import { FloatParser } from "./FloatParser.js";
import { MyRectangle } from "../primitives/MyRectangle.js";
import { MyTriangle } from "../primitives/MyTriangle.js";

export class PrimitiveParser {
    static parse(node, reader, scene) {
        if (children[i].nodeName != "primitive") {
            return ParserResult.fromError("unknown tag <" + children[i].nodeName + ">");
        }

        let id = reader.getString(node, "id");
        if (id == null) {
            return ParserResult.fromError("no ID defined for texture");
        }

        if (node.children.length === 1) {
            let childNode = node.children[0];
            let primitiveType = childNode.nodeName;

            if (primitiveType == 'rectangle') {
            } else if (primitiveType == 'triangle') {
                return PrimitiveParser.parseRectangle(node, reader, scene, id);
            } else if (primitiveType == 'cylinder') {
                return PrimitiveParser.parseCylinder(node, reader, scene, id);
            } else if (primitiveType == 'sphere') {
                return PrimitiveParser.parseSphere(node, reader, scene, id);
            } else if (primitiveType == 'torus') {
                return PrimitiveParser.parseTorus(node, reader, scene, id);
            }
        }
        return ParserResult.fromError("There must be exactly 1 primitive type (rectangle, triangle, cylinder, sphere or torus)");
    }

    static parseRectangle(node, reader, scene, id) {
        let x1 = FloatParser.parse(node, reader, 'x1');
        let y1 = FloatParser.parse(node, reader, 'y1');

        if (x1.hasError() || y1.hasError()) {
            return ParserResult.collect(null, [x1, y1]);
        }

        let x2 = FloatParser.parse(node, reader, 'x2', x1.getValue());
        let y2 = FloatParser.parse(node, reader, 'y2', y1.getValue());

        if (x2.hasError() || y2.hasError()) {
            return ParserResult.collect(null, [x2, y2]);
        }

        let rectangle = new MyRectangle(scene, id, x1.getValue(), x2.getValue(), y1.getValue(), y2.getValue());

        return ParserResult.fromValue(rectangle)
    }

    static parseTriangle(node, reader, scene, id) {
        let x1 = FloatParser.parse(node, reader, 'x1');
        let y1 = FloatParser.parse(node, reader, 'y1');
        let z1 = FloatParser.parse(node, reader, 'z1');

        if (x1.hasError() || y1.hasError() || z1.hasError()) {
            return ParserResult.collect(null, [x1, y1, z1]);
        }

        let x2 = FloatParser.parse(node, reader, 'x2');
        let y2 = FloatParser.parse(node, reader, 'y2');
        let z2 = FloatParser.parse(node, reader, 'z2');

        if (x2.hasError() || y2.hasError() || z2.hasError()) {
            return ParserResult.collect(null, [x2, y2, z2]);
        }

        let x3 = FloatParser.parse(node, reader, 'x3');
        let y3 = FloatParser.parse(node, reader, 'y3');
        let z3 = FloatParser.parse(node, reader, 'z3');

        if (x3.hasError() || y3.hasError() || z3.hasError()) {
            return ParserResult.collect(null, [x3, y3, z3]);
        }

        let triangle = new MyTriangle(
            scene, 
            x1.getValue(), 
            x2.getValue(),
            x3.getValue(),
            y1.getValue(),
            y2.getValue(),
            y3.getValue(),
            z1.getValue(),
            z2.getValue(),
            z3.getValue()
        );

        return ParserResult.fromValue(triangle);
    }

    static parseCylinder(node, reader, scene, id) {
        /*// Base
                var baseRadius = this.reader.getFloat(grandChildren[0], 'base');
                if (!(baseRadius != null && !isNaN(baseRadius) && baseRadius >= 0))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;

                // Top
                var topRadius = this.reader.getFloat(grandChildren[0], 'top');
                if (!(topRadius != null && !isNaN(topRadius) && topRadius >= 0))
                    return "unable to parse top of the primitive coordinates for ID = " + primitiveId;

                // Height
                var height = this.reader.getFloat(grandChildren[0], 'height');
                if (!(height != null && !isNaN(height) && height >= 0))
                    return "unable to parse height of the primitive coordinates for ID = " + primitiveId;

                // Slices
                var slices = this.reader.getInteger(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(slices) && slices > 2))
                    return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;

                // Stacks
                var stacks = this.reader.getInteger(grandChildren[0], 'stacks');
                if (!(stacks != null && !isNaN(stacks) && stacks > 0))
                    return "unable to parse stacks of the primitive coordinates for ID = " + primitiveId;

                var cylinder = new MyCylinder(this.scene, baseRadius, topRadius, height, slices, stacks);

                this.primitives[primitiveId] = cylinder;
                */
    }

    static parseSphere(node, reader, scene, id) {
        /*// radius
        var radius = this.reader.getFloat(grandChildren[0], 'radius');
        if (!(radius != null && !isNaN(radius) && radius > 0))
            return "unable to parse radius of the primitive coordinates for ID = " + primitiveId;

        // stacks
        var stacks = this.reader.getInteger(grandChildren[0], 'stacks');
        if (!(stacks != null && !isNaN(stacks) && stacks > 0))
            return "unable to parse stacks of the primitive coordinates for ID = " + primitiveId;

        // slices
        var slices = this.reader.getInteger(grandChildren[0], 'slices');
        if (!(slices != null && !isNaN(slices) && slices > 0))
            return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;

        var sphere = new MySphere(this.scene, radius, slices, stacks);

        this.primitives[primitiveId] = sphere;*/
    }

    static parseTorus(node, reader, scene, id) {
        /*// inner
        var inner = this.reader.getFloat(grandChildren[0], 'inner');
        if (!(inner != null && !isNaN(inner) && inner > 0))
            return "unable to parse inner of the primitive coordinates for ID = " + primitiveId;

        // outer
        var outer = this.reader.getFloat(grandChildren[0], 'outer');
        if (!(outer != null && !isNaN(outer) && outer > 0))
            return "unable to parse outer of the primitive coordinates for ID = " + primitiveId;

        // stacks
        var loops = this.reader.getInteger(grandChildren[0], 'loops');
        if (!(loops != null && !isNaN(loops) && loops > 0))
            return "unable to parse stacks of the primitive coordinates for ID = " + primitiveId;

        // slices
        var slices = this.reader.getInteger(grandChildren[0], 'slices');
        if (!(slices != null && !isNaN(slices) && slices > 0))
            return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;

        var torus = new MyTorus(this.scene, inner, outer, slices, loops);
        this.primitives[primitiveId] = torus;*/
    }

    /*
            // Checks for repeated IDs.
            if (this.primitives[primitiveId] != null)
                return "ID must be unique for each primitive (conflict: ID = " + primitiveId + ")";
            */
}