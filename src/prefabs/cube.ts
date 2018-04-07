import Phaser from 'phaser-ce';

export class Cube {

    private key: string = 'cube';

    private sprite: Phaser.Sprite;

    public constructor(game: Phaser.Game) {
        this.sprite = game.make.sprite(0, 0, this.key);
    }

    public getSprite(): Phaser.Sprite {
        return this.sprite;
    }
}