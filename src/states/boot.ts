import Phaser from 'phaser-ce';

export class Boot extends Phaser.State {

    public create(): void {
        this.input.maxPointers = 1;
        this.game.stage.backgroundColor = '000000';

        // fit screen
        // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.scale.pageAlignHorizontally = true;
        // this.scale.pageAlignVertically = true;
        // this.scale.refresh();

        this.game.state.start('Preload');
    }
}