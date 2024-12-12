import {readFileSync} from 'fs';
import {getHorizontalNeighbors, toCharMatrix} from "../util/util";

let start = Date.now()
const filePath = 'data.txt';
const fileContent = readFileSync(filePath, 'utf8');
let lines = fileContent.split("\r\n").filter(line => line !== "");


(function () {
    let result = 0;
    let map = toCharMatrix(lines);
    let tiles: Tile[][] = []

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            let height = map[i][j];
            if (!tiles[i]) tiles[i] = []
            tiles[i].push(newTile(i, j, height))
        }
    }

    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[i].length; j++) {
            let tile = tiles[i][j];
            if (tile.height === "9") {
                descentStart(tiles, tile)
            }
        }
    }

    result = tiles.flat()
        .filter(t => t.height == "0")
        .map(t => t.reachablePeaks.length)
        .reduce((a, b) => a + b)

    console.log(`Result: ${result} took ${Date.now() - start}ms`);
})();


interface Tile {
    row: number
    col: number
    height: string
    reachablePeaks: Tile[]
}

function newTile(i: number, j: number, height: string, reachablePeaks: Tile[] = []): Tile {
    return {row: i, col: j, height: height, reachablePeaks: reachablePeaks};
}

function descentStart(tiles: Tile[][], tile: Tile) {
    descent(tiles, tile, tile)
}

function descent(tiles: Tile[][], tile: Tile, startTile: Tile) {
    if (tile.height == "0") {
        // if (!tile.reachablePeaks.includes(startTile)) // part 2, for part 1: activate this line
        tile.reachablePeaks.push(startTile)
        return
    }

    let neighbors = getHorizontalNeighbors(tiles, tile.row, tile.col).filter(t => t.height !== ".")
    if (neighbors.length > 0) {
        for (let neighbor of neighbors) {
            if (+neighbor.height == +tile.height - 1) {
                descent(tiles, neighbor, startTile)
            }
        }
    }
}
