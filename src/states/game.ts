import Phaser from 'phaser-ce';

import { Config } from '../config';
import { HexTileSprite } from '../prefabs/hextilesprite';
import { WebSocketClient } from '../network/websocket_client';
import { HexMap } from '../map/hexmap';

export class Game extends Phaser.State {

    private static readonly MESSAGE_SWITCH: string = 'switch it';

    private client: WebSocketClient;
    private map: HexMap;
    private selectedPoint: Phaser.Point;

    private spaceKey: Phaser.Key;
    private spaceHit: boolean;

    public preload(): void {
        this.game.time.advancedTiming = true;
    }

    public create(): void {
        this.initSprites();
        this.initInput();
        this.initNetworking();
    }

    private initSprites(): void {
        let numHexesWide = 12; // temporary -- should pull from level-specific config
        let numHexesTall = 17; // temporary -- should pull from level-specific config
        this.map = new HexMap(numHexesWide, numHexesTall, this.game);
    }

    private initInput(): void {
        this.input.activePointer.leftButton.onDown.add(() => {
            this.selectedPoint = this.input.activePointer.position;
        });

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

    public render(): void {
        this.game.debug.text(this.game.time.fps.toString() || '--', 2, 14, '#a7aebe');
    }

    public update(): void {
        if (this.selectedPoint) {
            this.map.selectTileByPointerPosition(this.selectedPoint);
            this.selectedPoint = undefined;
        }
        this.map.hoverTileByPointerPosition(this.selectedPoint);
    }
}
