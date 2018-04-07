import Phaser from 'phaser-ce';

export class HexTile {

    private width: number = 36;
    private height: number = 25;
    private key: string = 'hextile';

    private sprite: Phaser.Sprite;

    public constructor(game: Phaser.Game) {
        this.sprite = game.make.sprite(0, 0, this.key);
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getSprite(): Phaser.Sprite {
        return this.sprite;
    }
}