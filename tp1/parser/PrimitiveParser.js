import { ParserResult } from "./ParserResult.js";
import { FloatParser } from "./FloatParser.js";
import { IntegerParser } from "./IntegerParser.js";
import { MyRectangle } from "../primitives/MyRectangle.js";
import { MyTriangle } from "../primitives/MyTriangle.js";
import { MyCylinder } from "../primitives/MyCylinder.js";
import { MySphere } from "../primitives/MySphere.js";
import { MyTorus } from "../primitives/MyTorus.js";
import {PrimitiveNode} from "../models/graph/PrimitiveNode.js";

export class PrimitiveParser {
    static parse(node, reader, scene) {
        if (node.nodeName !== "primitive") {
            return ParserResult.fromError("unknown tag <" + node.nodeName + ">");
        }

        let id = reader.getString(node, "id");
        if (id == null) {
            return ParserResult.fromError("no ID defined for texture");
        }

        if (node.children.length === 1) {
            let childNode = node.children[0];
            let primitiveType = childNode.nodeName;

            if (primitiveType === 'rectangle') {
                return PrimitiveParser.parseRectangle(childNode, reader, scene, id);
            } else if (primitiveType === 'triangle') {
                return PrimitiveParser.parseTriangle(childNode, reader, scene, id);
            } else if (primitiveType === 'cylinder') {
                return PrimitiveParser.parseCylinder(childNode, reader, scene, id);
            } else if (primitiveType === 'sphere') {
                return PrimitiveParser.parseSphere(childNode, reader, scene, id);
            } else if (primitiveType === 'torus') {
                return PrimitiveParser.parseTorus(childNode, reader, scene, id);
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
        return ParserResult.fromValue(new PrimitiveNode(id, rectangle));
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

        return ParserResult.fromValue(new PrimitiveNode(id, triangle));
    }

    static parseCylinder(node, reader, scene, id) {
        let baseRadius = FloatParser.parse(node, reader, 'base', 0);
        let topRadius = FloatParser.parse(node, reader, 'top', 0);
        let height = FloatParser.parse(node, reader, 'height', 0);
        let slices = IntegerParser.parse(node, reader, 'slices', 1);
        let stacks = IntegerParser.parse(node, reader, 'stacks', 1);

        let collection = ParserResult.collect(null, [baseRadius, topRadius, height, slices, stacks]);
        if (collection.hasError()) {
            return collection;
        }

        let cylinder = new MyCylinder(
            scene, 
            baseRadius.getValue(),
            topRadius.getValue(),
            height.getValue(),
            slices.getValue(),
            stacks.getValue()
        );
        
        return ParserResult.fromValue(new PrimitiveNode(id, cylinder));
    }

    static parseSphere(node, reader, scene, id) {
        let radius = FloatParser.parse(node, reader, 'radius', 0);
        let slices = IntegerParser.parse(node, reader, 'slices', 1);
        let stacks = IntegerParser.parse(node, reader, 'stacks', 1);

        let collection = ParserResult.collect(null, [radius, slices, stacks]);
        if (collection.hasError()) {
            return collection;
        }

        let sphere = new MySphere(
            scene, 
            radius.getValue(),
            slices.getValue(),
            stacks.getValue()
        );

        return ParserResult.fromValue(new PrimitiveNode(id, sphere));
    }

    static parseTorus(node, reader, scene, id) {
        let inner = FloatParser.parse(node, reader, 'inner', 0);
        let outer = FloatParser.parse(node, reader, 'outer', 0);
        let slices = IntegerParser.parse(node, reader, 'slices', 1);
        let loops = IntegerParser.parse(node, reader, 'loops', 1);

        let collection = ParserResult.collect(null, [inner, outer, slices, loops]);
        if (collection.hasError()) {
            return collection;
        }

        let torus = new MyTorus(
            scene, 
            inner.getValue(),
            outer.getValue(),
            slices.getValue(),
            loops.getValue()
        );

        return ParserResult.fromValue(new PrimitiveNode(id, torus));
    }

    /*
            // Checks for repeated IDs.
            if (this.primitives[primitiveId] != null)
                return "ID must be unique for each primitive (conflict: ID = " + primitiveId + ")";
            */
}