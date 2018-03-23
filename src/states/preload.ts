import Phaser from 'phaser-ce';

export class Preload extends Phaser.State {

    private ready: boolean;

    public preload(): void {

        this.game.load.image('hextile', 'assets/sprites/tile.png');
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    }

    private onLoadComplete(): void {
        this.ready = true;
    }

    public create(): void { }

    public update(): void {
        if (this.ready === true) {
            this.game.state.start('Game');
        }
    }
}