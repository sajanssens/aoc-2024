import {readFileSync} from 'fs';
import {countOccurrences, create2DArray, Hashtable, isEqual, Location, toCharMatrix} from "../util/util";

let start = Date.now()
const filePath = 'test.txt';
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
    // console.table(map);

    let antiNodes = create2DArray(rowCount, colCount, '.')
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            let mapElement = map[row][col];
            if (mapElement === '.') continue
            let currentLocation = [row, col];
            let antennaLocations = antennas[mapElement];
            for (let antennaLocation of antennaLocations) {
                if (isEqual(antennaLocation, currentLocation)) continue
                let rowDistance = antennaLocation[0] - row;
                let colDistance = antennaLocation[1] - col;
                let antiNodeRow = row + 2 * rowDistance;
                let antiNodeCol = col + 2 * colDistance;

                if (antiNodeRow >= 0 && antiNodeRow < rowCount && antiNodeCol >= 0 && antiNodeCol < colCount)
                    antiNodes[antiNodeRow][antiNodeCol] = '#'
            }
        }
    }
    result = countOccurrences(antiNodes, '#');
    console.log(`Result: ${result}, took ${Date.now() - start}ms`);
})();

// Part 2
(function () {
    let result = 0;

    console.log(`Result: ${result} took ${Date.now() - start}ms`);
})();
