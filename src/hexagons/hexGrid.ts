import { Hex } from './hexagons';
import { Layout } from './hexagons';
import { Point } from './hexagons';

export enum GridShape {SQUARE, HEXAGON, RHOMBUS}

export class Hexgrid {
    constructor (public size: number, public shape: GridShape, hexWidth: number, hexHeight: number) {
        this.map = new Map<string, Hex>();
        this.layout = new Layout(Layout.flat, new Point(hexWidth, hexHeight), new Point(0, 0));
        if (shape === GridShape.SQUARE) {
            // TODO
        }
        else if (shape === GridShape.HEXAGON) {
            for (let q: number = -size; q <= size; q++) {
                let r1: number = Math.max(-size, -q - size);
                let r2: number = Math.min(size, -q + size);
                for (let r: number = r1; r <= r2; r++) {
                    this.map.set([q, r].join(), new Hex(q, r, -q - r));
                }
            }
        }
        else if (shape === GridShape.RHOMBUS) {
            // TODO
        }
        else {
            throw 'Unsupported Hexgrid shape';
        }
    }

    map: Map<string, Hex>;
    layout: Layout;
}
