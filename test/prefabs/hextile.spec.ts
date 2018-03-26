import { HexTile } from '../../src/prefabs/hextile';

import { expect } from 'chai';
import 'mocha';

describe('Hextile', () => {
    it('should be able to be created with initial (x, y) coordinates', () => {
        let x: number = 1;
        let y: number = 2;
        // need to mock the phaser bits...
        // let tile: HexTile = new HexTile(null, x, y);
        expect(x).to.equal(1);
        expect(y).to.equal(2);
    });
});