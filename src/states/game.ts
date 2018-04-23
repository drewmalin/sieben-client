import Phaser from 'phaser-ce';

import { Config } from '../config';
import { HexTile } from '../prefabs/hextile';
import { WebSocketClient } from '../network/websocket_client';
import { Hexgrid } from '../hexagons/hexGrid';
import { GridShape } from '../hexagons/hexGrid';
import { Hex } from '../hexagons/hexagons';
import { Point } from '../hexagons/hexagons';

export class Game extends Phaser.State {

    private static readonly MESSAGE_SWITCH: string = 'switch it';

    private client: WebSocketClient;
    private hexTile: Phaser.Sprite;
    private hexgrid: Hexgrid;
    private graphics: Phaser.Graphics;

    private spaceKey: Phaser.Key;
    private spaceHit: boolean;

    public create(): void {
        // this.hexTile = new HexTile(this.game, this.game.world.centerX, this.game.world.centerY);
        // this.game.add.existing(this.hexTile);

        this.client = new WebSocketClient('ws://' + Config.SERVER_ADDR);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.spaceKey.onDown.add(() => {
            this.spaceHit = !this.spaceHit;
            this.client.sendMessage(Game.MESSAGE_SWITCH);
        }, this);

        this.client.onConnectionOpen((event: Event) => {
            console.log('connection to server opened, ' + event);
        });

        this.client.onConnectionClose((event: CloseEvent) => {
            console.log('connection to server closed, ' + event);
        });

        this.client.onError((event: Event) => {
            console.error('connection error: ', event);
        });

        this.client.onMessage((message: string, event: MessageEvent) => {
            if (message.indexOf(Game.MESSAGE_SWITCH) >= 0) {
                this.spaceHit = !this.spaceHit;
            }
            console.log('Received: ' + event);
        });

        this.graphics = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
        this.graphics.lineStyle(3, 0x999999, 0.5);
        this.hexgrid = new Hexgrid(20, GridShape.HEXAGON, 20, 20);
        /*
        Array.from(this.hexgrid.map.values()).forEach(hex => {
            let corners: Point[] = this.hexgrid.layout.polygonCorners(hex);
            this.graphics.moveTo(corners[0].x, corners[0].y);
            for (let i = 1; i < 6; i++) {
                this.graphics.lineTo(corners[i].x, corners[i].y);
            }
            this.graphics.lineTo(corners[0].x, corners[0].y);
        });*/
        this.hexgrid.drawlines(this.graphics);
        this.hexgrid.drawPoints(this.graphics);
    }

    public update(): void {
        /*
        if (this.spaceHit === true) {
            this.hexTile.tint = 0x86bfda;
        }
        else {
            this.hexTile.tint = 0xffffff;
        }
        */
    }
}