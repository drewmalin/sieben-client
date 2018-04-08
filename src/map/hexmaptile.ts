import Phaser from 'phaser-ce';

import { HexTileSprite } from '../prefabs/hextilesprite';
import { Config } from '../config';

export class HexMapTile {

    private static hoverTint = 0xcee5f0;
    private static selectedTint = 0x86bfda;
    private static noTint = 0xffffff;

    private sprite: Phaser.Sprite;
    private selected: boolean;
    private hover: boolean;

    private game: Phaser.Game;

    public constructor(x: number, y: number, game: Phaser.Game) {
        this.game = game;
        this.sprite = new HexTileSprite(x, y, this.game);
        this.sprite.inputEnabled = true;
    }

    public getSprite(): Phaser.Sprite {
        return this.sprite;
    }

    public toggleSelect(): void {
        this.selected ? this.deselect() : this.select();
    }

    public toggleHover(): void {
        this.hover ? this.unsetHover() : this.setHover();
    }

    public select(): void {
        this.selected = true;
        this.sprite.tint = HexMapTile.selectedTint;
    }

    public deselect(): void {
        this.selected = false;
        if (this.hover) {
            this.sprite.tint = HexMapTile.hoverTint;
        }
        else {
            this.sprite.tint = HexMapTile.noTint;
        }
    }

    public setHover(): void {
        this.hover = true;
        if (this.selected) {
            return;
        }
        else {
            this.sprite.tint = HexMapTile.hoverTint;
        }
    }

    public unsetHover(): void {
        this.hover = false;
        if (this.selected) {
            return;
        }
        else {
            this.sprite.tint = HexMapTile.noTint;
        }
    }
}