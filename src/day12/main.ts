import {readFileSync} from 'fs';
import {getNeighbors, Hashtable, toCharMatrix} from "../util/util";

let start = Date.now()
const filePath = 'data.txt';
const fileContent = readFileSync(filePath, 'utf8');
let lines = fileContent.split("\r\n").filter(line => line !== "");

export interface Tile {
    row: number
    col: number
    plant: string
    region: number
    perimeter: number
}

function newTile(i: number, j: number, plant: string, region = -1): Tile {
    return {row: i, col: j, plant: plant, region: region, perimeter: 4};
}

function determineRegion(tile: Tile, tiles: Tile[][], regionId: number, regions: Hashtable<Tile>) {
    tile.region = regionId
    if (!regions[regionId]) regions[regionId] = []
    regions[regionId].push(tile)
    let neighbors = getNeighbors(tiles, tile.row, tile.col, true);
    for (let neighbor of neighbors) {
        if (neighbor.plant === tile.plant && neighbor.region !== regionId) {
            determineRegion(neighbor, tiles, regionId, regions)
        }
    }
}

// Part 1
(function () {
    let result = 0;

    let map = toCharMatrix(lines);
    let tiles: Tile[][] = []

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            let plant = map[i][j]
            if (!tiles[i]) tiles[i] = []
            tiles[i].push(newTile(i, j, plant))
        }
    }

    let regionId = 1
    const regions: Hashtable<Tile> = {};

    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[i].length; j++) {
            let tile = tiles[i][j];
            if (tile.region !== -1) continue
            determineRegion(tile, tiles, regionId, regions)
            regionId++
        }
    }

    for (const regionId in regions) {
        let region = regions[regionId];
        let area = region.length;
        let perimeter = 0
        for (let tile of region) {
            let neighbors = getNeighbors(tiles, tile.row, tile.col);
            for (let neighbor of neighbors) {
                if (neighbor.plant === tile.plant && neighbor.region === tile.region) {
                    tile.perimeter--
                }
            }
            perimeter += tile.perimeter
        }

        result += area * perimeter
    }


    console.log(`Result: ${result} took ${Date.now() - start}ms`);
})();

// Part 2
(function () {
    let result = 0;

    console.log(`Result: ${result} took ${Date.now() - start}ms`);
})();

