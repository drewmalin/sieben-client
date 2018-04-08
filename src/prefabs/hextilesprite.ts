import Phaser from 'phaser-ce';

export class HexTileSprite extends Phaser.Sprite {

    private static width: number = 36;
    private static height: number = 25;
    private static key: string = 'hextile';

    public constructor(x: number, y: number, game: Phaser.Game) {
        super(game, x, y, HexTileSprite.key);
    }

    public static getWidth(): number {
        return HexTileSprite.width;
    }

    public static getHeight(): number {
        return HexTileSprite.height;
    }
}