import Phaser from 'phaser-ce';

export class HexTile extends Phaser.Sprite {

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'hextile');
    }
}