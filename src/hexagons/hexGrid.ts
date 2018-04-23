import Phaser from 'phaser-ce';

import { Hex } from './hexagons';
import { Layout } from './hexagons';
import { Point } from './hexagons';
import { start } from 'repl';

export enum GridShape {SQUARE, HEXAGON, RHOMBUS}

export class Hexgrid {
    constructor (public size: number, public shape: GridShape, public hexWidth: number, public hexHeight: number) {
        this.map = new Map<string, Hex>();
        this.layout = new Layout(Layout.flat, new Point(hexWidth, hexHeight), new Point(0, 0));
        if (shape === GridShape.SQUARE) {
            // TODO
        }
        else if (shape === GridShape.HEXAGON) {
            let pointCount = Hexgrid.countHexGridPoints(size, shape);
            this.points = [];
            for (let q: number = -size; q <= size; q++) {
                let r1: number = Math.max(-size, -q - size);
                let r2: number = Math.min(size, -q + size);
                for (let r: number = r1; r <= r2; r++) {
                    this.map.set([q, r].join(), new Hex(q, r, -q - r));
                }
            }
            this.placePoints(size, shape);
            this.populatePointChains();
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
    points: Point[];
    outies: number[];
    innies: number[];
    pointChains: number[][];
    lineSegments: number[];

    static countHexGridPoints(size: number, shape: GridShape): number {
        if (shape === GridShape.HEXAGON) {
            if (size <= 1) {
                return 6;
            }
            else {
                return ((2 * size) - 1) * 6 + Hexgrid.countHexGridPoints(size - 1, shape);
            }
        }
        return 0;
    }

    placePoints(size: number, shape: GridShape): void {
        // Remember that positive Y is DOWN.
        console.log('Placing grid points...');
        let halfRoot3 = Math.sqrt(3) / 2;
        let halfWidth = this.hexWidth / 2;
        if (shape === GridShape.HEXAGON) {
            this.outies = []; // the vertices of a layer which connect to outer layers
            this.innies = []; // the vertices of a layer which connect to inner layers
            let i = 0;
            for (let r = 0; r < size; r++) {
                // Points will be drawn in counterclockwise order starting with the east vertex of the
                // southeastern corner hex of the layer
                let firstVertOfLayer = new Point((r * halfWidth * 3) + this.hexWidth, (r + 1) * halfRoot3 * this.hexHeight);
                let cursor = new Point(firstVertOfLayer.x, firstVertOfLayer.y);
                this.points.push(cursor);
                this.outies.push(i);
                i++;
                let zigzag = r; // points added as "angle in, angle out" pairs
                for (zigzag = r; zigzag >= 0; zigzag--) { // up right grid side
                    cursor = new Point(cursor.x - halfWidth, cursor.y - halfRoot3 * this.hexHeight);
                    this.points.push(cursor);
                    zigzag === 0 ? this.outies.push(i) : this.innies.push(i);
                    i++;
                    if (zigzag !== 0) { // Prevents the "angle out" as we reach the next corner hex
                        cursor = new Point(cursor.x + halfWidth, cursor.y - halfRoot3 * this.hexHeight);
                        this.points.push(cursor);
                        this.outies.push(i);
                        i++;
                    }
                }
                for (zigzag = r; zigzag >= 0; zigzag--) { // northeast grid side
                    cursor = new Point(cursor.x - this.hexWidth, cursor.y);
                    this.points.push(cursor);
                    zigzag === 0 ? this.outies.push(i) : this.innies.push(i);
                    i++;
                    if (zigzag !== 0) { // Prevents the "angle out" as we reach the next corner hex
                        cursor = new Point(cursor.x - halfWidth, cursor.y - halfRoot3 * this.hexHeight);
                        this.points.push(cursor);
                        this.outies.push(i);
                        i++;
                    }
                }
                for (zigzag = r; zigzag >= 0; zigzag--) { // northwest grid side
                    cursor = new Point(cursor.x - halfWidth, cursor.y + halfRoot3 * this.hexHeight);
                    this.points.push(cursor);
                    zigzag === 0 ? this.outies.push(i) : this.innies.push(i);
                    i++;
                    if (zigzag !== 0) { // Prevents the "angle out" as we reach the next corner hex
                        cursor = new Point(cursor.x - this.hexWidth, cursor.y);
                        this.points.push(cursor);
                        this.outies.push(i);
                        i++;
                    }
                }
                for (zigzag = r; zigzag >= 0; zigzag--) { // down west grid side
                    cursor = new Point(cursor.x + halfWidth, cursor.y + halfRoot3 * this.hexHeight);
                    this.points.push(cursor);
                    zigzag === 0 ? this.outies.push(i) : this.innies.push(i);
                    i++;
                    if (zigzag !== 0) { // Prevents the "angle out" as we reach the next corner hex
                        cursor = new Point(cursor.x - halfWidth, cursor.y + halfRoot3 * this.hexHeight);
                        this.points.push(cursor);
                        this.outies.push(i);
                        i++;
                    }
                }
                for (zigzag = r; zigzag >= 0; zigzag--) { // southwest grid side
                    cursor = new Point(cursor.x + this.hexWidth, cursor.y);
                    this.points.push(cursor);
                    zigzag === 0 ? this.outies.push(i) : this.innies.push(i);
                    i++;
                    if (zigzag !== 0) { // Prevents the "angle out" as we reach the next corner hex
                        cursor = new Point(cursor.x + halfWidth, cursor.y + halfRoot3 * this.hexHeight);
                        this.points.push(cursor);
                        this.outies.push(i);
                        i++;
                    }
                }
                for (zigzag = r; zigzag >= 0; zigzag--) { // southeast grid side
                    cursor = new Point(cursor.x + halfWidth, cursor.y - halfRoot3 * this.hexHeight);
                    let roundingErrorTolerance = 0.005;
                    if (Math.abs(cursor.x - firstVertOfLayer.x) > roundingErrorTolerance
                            || Math.abs(cursor.y - firstVertOfLayer.y) > roundingErrorTolerance) {
                        this.points.push(cursor);
                        zigzag === 0 ? this.outies.push(i) : this.innies.push(i);
                        i++;
                    }
                    if (zigzag !== 0) { // Prevents the "angle out" as we reach the next corner hex
                        cursor = new Point(cursor.x + this.hexWidth, cursor.y);
                        this.points.push(cursor);
                        this.outies.push(i);
                        i++;
                    }
                }
            }
        }
        console.log('Finished placing grid points.');
    }

    // To prevent duplicate draw calls, store the chain of points that should be connected by a line
    // Values are indices into the points array.
    populatePointChains(): void {
        console.log('Populating point chains...');
        // TODO: support other grid shapes (only HEXAGON currently)
        this.pointChains = [];
        let i = 0;
        for (let ring = 1; ring <= this.size; ring++) {
            let chain = [];
            let startpoint = i;
            for (let p = i; p < startpoint + ((2 * ring) - 1) * 6; p++) {
                chain.push(i);
                i++;
            }
            chain.push(startpoint);
            this.pointChains.push(chain);
        }
        console.log('Done with point chains.');
    }

    drawlines(graphics: Phaser.Graphics): void {
        console.log('Starting draw...');
        // draw rings
        this.pointChains.forEach((chain, index) => {
            graphics.moveTo(this.points[chain[0]].x, this.points[chain[0]].y);
            for (let i = 1; i < chain.length; i++) {
                graphics.lineTo(this.points[chain[i]].x, this.points[chain[i]].y);
            }
        });
        // draw spokes
        for (let i = 0; i < this.innies.length && i < this.outies.length; i++) {
            let in_index = this.innies[i];
            let out_index = this.outies[i];
            if (in_index < this.points.length && out_index < this.points.length) {
                graphics.moveTo(this.points[this.innies[i]].x, this.points[this.innies[i]].y);
                graphics.lineTo(this.points[this.outies[i]].x, this.points[this.outies[i]].y);
            }
        }
        console.log('Draw done.');
    }

    drawPoints(graphics: Phaser.Graphics): void {
        graphics.lineStyle(1, 0xff0000, 1);
        let offsets: Point[] = [];
        offsets.push(new Point(-3, 3));
        offsets.push(new Point(3, -3));
        offsets.push(new Point(3, 3));
        offsets.push(new Point(-3, -3));
        this.outies.forEach(i => {
            if (i < this.points.length) {
                let p = this.points[i];
                graphics.moveTo(p.x + offsets[0].x, p.y + offsets[0].y);
                graphics.lineTo(p.x + offsets[1].x, p.y + offsets[1].y);
                graphics.moveTo(p.x + offsets[2].x, p.y + offsets[2].y);
                graphics.lineTo(p.x + offsets[3].x, p.y + offsets[3].y);
            }
        });
        graphics.lineStyle(1, 0x00ff00, 1);
        this.innies.forEach(i => {
            if (i < this.points.length) {
                let p = this.points[i];
                graphics.moveTo(p.x + offsets[0].x, p.y + offsets[0].y);
                graphics.lineTo(p.x + offsets[1].x, p.y + offsets[1].y);
                graphics.moveTo(p.x + offsets[2].x, p.y + offsets[2].y);
                graphics.lineTo(p.x + offsets[3].x, p.y + offsets[3].y);
            }
        });
    }
}
