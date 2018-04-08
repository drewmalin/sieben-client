import Phaser from 'phaser-ce';

import { HexTileSprite } from '../prefabs/hextilesprite';
import { Config } from '../config';
import { HexMapTile } from './hexmaptile';

export class HexMap {

    private static sceneOriginX = 25;
    private static sceneOriginY = 36;

    private width: number;
    private height: number;
    private game: Phaser.Game;

    private tiles: HexMapTile[][];

    public constructor(width: number, height: number, game: Phaser.Game) {
        this.width = width;
        this.height = height;
        this.game = game;
        this.tiles = [];

        this.load();
    }

    private load(): void {
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {

                // shift x placement by (width / 2) on every other row
                let shift = j % 2 === 0 ? 0 : HexTileSprite.getWidth() / 2;

                let deltaX = (i * HexTileSprite.getWidth()) + shift;
                let deltaY = (j * HexTileSprite.getHeight());

                let tile = this.newHexMapTile(HexMap.sceneOriginX + deltaX, HexMap.sceneOriginY + deltaY);
                this.setTile(i, j, tile);
            }
        }
    }

    private newHexMapTile(x: number, y: number): HexMapTile {
        let tile = new HexMapTile(x, y, this.game);
        this.game.add.existing(tile.getSprite());
        return tile;
    }

    public selectTileByPointerPosition(point: Phaser.Point): void {
        let x = this.game.input.activePointer.position.x;
        let y = this.game.input.activePointer.position.y;

        let tileCoords = this.windowCoordsToTileCoords(x, y);
        this.selectTile(tileCoords.x, tileCoords.y);
    }

    public hoverTileByPointerPosition(point: Phaser.Point): void {
        let x = this.game.input.activePointer.position.x;
        let y = this.game.input.activePointer.position.y;

        let tileCoords = this.windowCoordsToTileCoords(x, y);
        this.hoverTile(tileCoords.x, tileCoords.y);
    }

    public selectTile(x: number, y: number): void {
        let tile = this.getTile(x, y);
        if (!tile) {
            return;
        }

        tile.toggleSelect();
    }

    public hoverTile(x: number, y: number): void {
        this.clearHover();

        let tile = this.getTile(x, y);
        if (!tile) {
            return;
        }

        tile.toggleHover();
        this.getAdjacentTiles(x, y).forEach( (tile) => {
            tile.toggleHover();
        });
    }

    public clearHover(): void {
        this.tiles.forEach( (column) => {
            column.forEach( (tile) => {
                tile.unsetHover();
            });
        });
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    private getAdjacentTiles(x: number, y: number): HexMapTile[] {
        let adjacentTiles = [];

        let north = this.getAdjacentTilesNorth(x, y);
        if (north) {
            adjacentTiles.push(...north);
        }

        let south = this.getAdjacentTilesSouth(x, y);
        if (south) {
            adjacentTiles.push(...south);
        }

        let east = this.getAdjacentTileEast(x, y);
        if (east) {
            adjacentTiles.push(east);
        }

        let west = this.getAdjacentTileWest(x, y);
        if (west) {
            adjacentTiles.push(west);
        }

        return adjacentTiles;
    }

    private getAdjacentTilesNorth(x: number, y: number): HexMapTile[] {
        let adjacentTiles = [];
        let shift = y % 2 === 0 ? -1 : 0;

        let northWest = this.getTile(x + shift, y - 1);
        if (northWest) {
            adjacentTiles.push(northWest);
        }

        let northEast = this.getTile(x + shift + 1, y - 1);
        if (northEast) {
            adjacentTiles.push(northEast);
        }

        return adjacentTiles;
    }

    private getAdjacentTilesSouth(x: number, y: number): HexMapTile[] {
        let adjacentTiles = [];
        let shift = y % 2 === 0 ? -1 : 0;

        let southWest = this.getTile(x + shift, y + 1);
        if (southWest) {
            adjacentTiles.push(southWest);
        }

        let southEast = this.getTile(x + shift + 1, y + 1);
        if (southEast) {
            adjacentTiles.push(southEast);
        }

        return adjacentTiles;
    }

    private getAdjacentTileEast(x: number, y: number): HexMapTile | undefined {
        return this.getTile(x + 1, y);
    }

    private getAdjacentTileWest(x: number, y: number): HexMapTile | undefined {
        return this.getTile(x - 1, y);
    }

    private getTile(x: number, y: number): HexMapTile | undefined {
        if (x < 0 || x >= this.getWidth() || y < 0 || y >= this.getHeight()) {
            return undefined;
        }
        return this.tiles[x][y];
    }

    private setTile(x: number, y: number, tile: HexMapTile): void {
        if (this.tiles[x] == null) {
            this.tiles[x] = [];
        }
        this.tiles[x][y] = tile;
    }

    private windowCoordsToTileCoords(x: number, y: number): Phaser.Point {
        let tileY = Math.floor((y - HexMap.sceneOriginY) / HexTileSprite.getHeight());
        let shift = tileY % 2 === 0 ? 0 : HexTileSprite.getWidth() / 2;
        let tileX = Math.floor((x - shift - HexMap.sceneOriginX) / HexTileSprite.getWidth());
        return new Phaser.Point(tileX, tileY);
    }
}