import 'phaser';
declare const Phaser: any;

class Game {
    
    game: Phaser.Game;

    constructor() {
        const config = {
            type: Phaser.AUTO,
            width: 500,
            height: 500,
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        };
        this.game = new Phaser.Game(config);
    }

    preload() { }

    create() { 
        const text = ":D";
        const style = {
            font: "70px Arial",
            fill: "#ffffff",
            align: "center"
        };

        this.add.text(210, 210, text, style);
    }

    update() { }
}

window.onload = () => {
    const game: Game = new Game();
};
