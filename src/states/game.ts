import Phaser from 'phaser-ce';

import {HexTile} from '../prefabs/hextile';

export class Game extends Phaser.State {

    private hexTile: Phaser.Sprite;

    private spaceKey: Phaser.Key;
    private spaceHit: boolean;

    public create(): void {
        this.hexTile = new HexTile(this.game, this.game.world.centerX, this.game.world.centerY);
        this.game.add.existing(this.hexTile);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(() => {
            this.spaceHit = !this.spaceHit;
        }, this);
    }

    public update(): void {
        if (this.spaceHit === true) {
            this.hexTile.tint = 0x86bfda;
        }
        else {
            this.hexTile.tint = 0xffffff;
        }
    }
}