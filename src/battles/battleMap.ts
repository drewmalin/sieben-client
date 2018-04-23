import { Hexgrid, GridShape } from "../hexagons/hexGrid";
import { Hex } from "../hexagons/hexagons";

export class BattleMap {
    constructor (public size: number, public shape: GridShape) {
        this.locations = new Map<string, Location>();
        if (shape === GridShape.HEXAGON) {
            for (let q: number = -size; q <= size; q++) {
                let r1: number = Math.max(-size, -q - size);
                let r2: number = Math.min(size, -q + size);
                for (let r: number = r1; r <= r2; r++) {
                    this.locations.set([q, r].join(), new Location(new Hex(q, r, -q - r)));
                }
            }
        }
    }
    grid: Hexgrid;
    locations: Map<string, Location>;
}

// A Location combines a given hex, it's game properties like terrain etc., and game entities
// occupying that hex.
class Location {
    constructor (public hex: Hex) {

    }
}