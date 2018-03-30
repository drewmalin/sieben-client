import { Config } from '../config';

import * as ws from 'websocket';

export class WebSocketClient {

    private static readonly EVENT_OPEN: string = 'open';
    private static readonly EVENT_CLOSE: string = 'close';
    private static readonly EVENT_MESSAGE: string = 'message';
    private static readonly EVENT_ERROR: string = 'error';

    private websocket: WebSocket;

    constructor(url: string) {
        this.websocket = new WebSocket(url);
    }

    public sendMessage(message: string): void {
        this.websocket.send(message);
    }

    public onConnectionOpen(callback: (event: Event) => void): void {
        this.onEvent(WebSocketClient.EVENT_OPEN, callback);
    }

    public onConnectionClose(callback: () => void): void {
        this.websocket.addEventListener(WebSocketClient.EVENT_CLOSE, () => {
            callback();
        });
    }
    public onMessage(callback: (message: string, event: MessageEvent) => void): void {
        this.websocket.addEventListener(WebSocketClient.EVENT_MESSAGE, (event: MessageEvent) => {
            let message = event.data as string;
            callback(message, event);
        });
    }

    public onError(callback: (event: ErrorEvent) => void): void {
        this.onEvent(WebSocketClient.EVENT_ERROR, callback);
    }

    public onEvent(event: any, callback: (event: any) => void): void {
        this.websocket.addEventListener(event, (event) => {
            callback(event);
        });
    }
}