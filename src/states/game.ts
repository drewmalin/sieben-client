import Phaser from 'phaser-ce';

import { Config } from '../config';
import { HexTile } from '../prefabs/hextile';
import { Cube } from '../prefabs/cube';
import { WebSocketClient } from '../network/websocket_client';

export class Game extends Phaser.State {

    private static readonly MESSAGE_SWITCH: string = 'switch it';

    private client: WebSocketClient;

    private scene: Phaser.RenderTexture;
    private hexTile: HexTile;
    private cube: Cube;

    private spaceKey: Phaser.Key;
    private spaceHit: boolean;

    public create(): void {
        this.initSprites();
        this.initInput();
        this.initNetworking();
    }

    private initSprites(): void {
        this.scene = this.game.add.renderTexture(Config.WINDOW_WIDTH, Config.WINDOW_HEIGHT);
        this.game.add.sprite(0, 0, this.scene);

        this.hexTile = new HexTile(this.game);
        this.cube = new Cube(this.game);
    }

    private initInput(): void {
        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.spaceKey.onDown.add(() => {
            this.spaceHit = !this.spaceHit;
            this.client.sendMessage(Game.MESSAGE_SWITCH);
        }, this);
    }

    private initNetworking(): void {
        this.client = new WebSocketClient('ws://' + Config.SERVER_ADDR);

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
    }

    public update(): void {
        if (this.spaceHit === true) {
            // this.hexTile.tint = 0x86bfda;
        }
        else {
            // this.hexTile.tint = 0xffffff;
        }
        (this.scene as any).clear();
        this.renderFloor(25, 36, 12, 17);
        this.renderCubes();
    }

    private renderFloor(sceneOriginX: number, sceneOriginY: number, sceneWidth: number, sceneHeight: number): void {
        for (let j = 0; j < sceneHeight; j++) {
            for (let i = 0; i < sceneWidth; i++) {

                // shift x placement by (width / 2) on every other row
                let shift = j % 2 === 0 ? this.hexTile.getWidth() / 2 : 0;

                let deltaX = (i * this.hexTile.getWidth()) + shift;
                let deltaY = (j * this.hexTile.getHeight());

                this.scene.renderXY(this.hexTile.getSprite(), sceneOriginX + deltaX, sceneOriginY + deltaY, false);
            }
        }
    }

    private renderCubes(): void {
        this.scene.renderXY(this.cube.getSprite(), this.game.world.centerX, this.game.world.centerY, false);
    }
}
