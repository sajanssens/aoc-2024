import {readFileSync} from 'fs';
import {create2DArray, Hashtable, isEqual, Location, toCharMatrix} from "../util/util";

let start = Date.now()
const filePath = 'data.txt';
const fileContent = readFileSync(filePath, 'utf8');
let lines = fileContent.split("\r\n").filter(line => line !== "");

// Part 1
(function () {
    let result = 0;
    let map = toCharMatrix(lines);
    let antennas: Hashtable<Location> = {}
    // Build hashtable with the locations for each antenna
    let rowCount = map.length;
    let colCount = map[0].length;

    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            let mapElement = map[row][col];
            if (mapElement === '.') continue
            if (!antennas[mapElement]) antennas[mapElement] = []
            antennas[mapElement].push([row, col])
        }
    }

    let antiNodes = create2DArray(rowCount, colCount, '.')
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            let mapElement = map[row][col];
            if (mapElement === '.') continue
            let currentLocation = [row, col];
            let antennaLocations = antennas[mapElement];
            for (let antennaLocation of antennaLocations) {
                if (isEqual(antennaLocation, currentLocation)) {
                    antiNodes[row][col] = mapElement // part 2
                    continue
                }
                let rowDistance = antennaLocation[0] - row;
                let colDistance = antennaLocation[1] - col;

                let factor = 2
                while (true) { // part 2
                    let antiNodeRow = row + factor * rowDistance;
                    let antiNodeCol = col + factor * colDistance;

                    if (antiNodeRow >= 0 && antiNodeRow < rowCount && antiNodeCol >= 0 && antiNodeCol < colCount)
                        antiNodes[antiNodeRow][antiNodeCol] = '#'
                    else
                        break // part 2

                    factor++ // part 2
                }
            }
        }
    }
    result = antiNodes.flat().filter(c => c !== '.').length
    console.log(`Result: ${result} | it took ${Date.now() - start} ms`);
})();

// Part 2
(function () {
    let result = 0;

    console.log(`Result: ${result} took ${Date.now() - start}ms`);
})();
