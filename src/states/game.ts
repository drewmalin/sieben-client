import Phaser from 'phaser-ce';

import { Config } from '../config';
import { HexTile } from '../prefabs/hextile';
import { WebSocketClient } from '../network/websocket_client';

export class Game extends Phaser.State {

    private client: WebSocketClient;
    private hexTile: Phaser.Sprite;

    private spaceKey: Phaser.Key;
    private spaceHit: boolean;

    public create(): void {
        this.hexTile = new HexTile(this.game, this.game.world.centerX, this.game.world.centerY);
        this.game.add.existing(this.hexTile);

        this.client = new WebSocketClient('ws://' + Config.SERVER_ADDR);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.spaceKey.onDown.add(() => {
            this.spaceHit = !this.spaceHit;
            this.client.sendMessage('switch it');
        }, this);

        this.client.onConnectionOpen((event: Event) => {
            console.log('websocket connection open' + event);
        });

        this.client.onConnectionClose(() => {
            console.log('websocket connection closed');
        });

        this.client.onError((event: ErrorEvent) => {
            console.error(event.error);
        });

        this.client.onMessage((message: string, event: MessageEvent) => {
            if (message.indexOf('switch it') >= 0) {
                this.spaceHit = !this.spaceHit;
            }
            console.log('Received: ' + event);
        });
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