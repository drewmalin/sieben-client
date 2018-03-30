import Phaser from 'phaser-ce';

import { Config } from './config';
import { Boot } from './states/boot';
import { Preload } from './states/preload';
import { Game } from './states/game';

class Sieben extends Phaser.Game {

  constructor() {
    super(Config.WINDOW_WIDTH, Config.WINDOW_HEIGHT, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', Boot, false);
    this.state.add('Preload', Preload, false);
    this.state.add('Game', Game, false);

    this.state.start('Boot');
  }
}


window.onload = () => {
  new Sieben();
};

