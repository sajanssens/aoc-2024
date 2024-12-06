import {readFileSync} from 'fs';
import {countOccurrences, findElementPosition, toCharMatrix} from "../util/util";

const filePath = 'data.txt';
const fileContent = readFileSync(filePath, 'utf8');
let lines = fileContent.split("\r\n");

// Part 1
(function () {
    let map = toCharMatrix(lines);
    let guard = '^';
    let guardPos = findElementPosition(map, guard);
    let guardRow = guardPos[0]
    let guardCol = guardPos[1]
    while (true) {

        // move or turn guard
        if (guard === '^') {
            if (map[guardRow - 1][guardCol] === '#') {
                guard = '>'
                map[guardRow][guardCol] = guard
            } else {
                map[guardRow][guardCol] = 'X'
                guardPos[0]--
            }
        } else if (guard === '>') {
            if (map[guardRow][guardCol + 1] === '#') {
                guard = 'v'
                map[guardRow][guardCol] = guard
            } else {
                map[guardRow][guardCol] = 'X'
                guardPos[1]++
            }
        } else if (guard === '<') {
            if (map[guardRow][guardCol - 1] === '#') {
                guard = '^'
                map[guardRow][guardCol] = guard
            } else {
                map[guardRow][guardCol] = 'X'
                guardPos[1]--
            }
        } else if (guard === 'v') {
            if (map[guardRow + 1][guardCol] === '#') {
                guard = '<'
                map[guardRow][guardCol] = guard
            } else {
                map[guardRow][guardCol] = 'X'
                guardPos[0]++
            }
        }
        guardRow = guardPos[0]
        guardCol = guardPos[1]

        // console.log(guardPos);
        // console.log(guard);
        if (guard == 'v' && guardRow == map.length - 1 ||
            guard == '^' && guardRow == 0 ||
            guard == '>' && guardCol == map[0].length - 1 ||
            guard == '<' && guardCol == 0)
            break
    }
    let result1 = countOccurrences(map, 'X') + 1
    console.log(result1);
})();

// Part 2
(function () {
    let map = toCharMatrix(lines);
    let numberOfObstacles = 0
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {

            let map = toCharMatrix(lines);
            let guard = '^';
            let guardPos = findElementPosition(map, guard);
            let guardRow = guardPos[0]
            let guardCol = guardPos[1]
            if (guardRow == row && guardCol == col)
                continue
            map[row][col] = '#'

            let counter = 0;
            const LIMIT = 10000; // Max allowed iterations

            while (true) {
                counter++
                // move or turn guard
                if (guard === '^') {
                    if (map[guardRow - 1][guardCol] === '#') {
                        guard = '>'
                        map[guardRow][guardCol] = guard
                    } else {
                        map[guardRow][guardCol] = 'X'
                        guardPos[0]--
                    }
                } else if (guard === '>') {
                    if (map[guardRow][guardCol + 1] === '#') {
                        guard = 'v'
                        map[guardRow][guardCol] = guard
                    } else {
                        map[guardRow][guardCol] = 'X'
                        guardPos[1]++
                    }
                } else if (guard === '<') {
                    if (map[guardRow][guardCol - 1] === '#') {
                        guard = '^'
                        map[guardRow][guardCol] = guard
                    } else {
                        map[guardRow][guardCol] = 'X'
                        guardPos[1]--
                    }
                } else if (guard === 'v') {
                    if (map[guardRow + 1][guardCol] === '#') {
                        guard = '<'
                        map[guardRow][guardCol] = guard
                    } else {
                        map[guardRow][guardCol] = 'X'
                        guardPos[0]++
                    }
                }
                guardRow = guardPos[0]
                guardCol = guardPos[1]

                // console.log(guardPos);
                // console.log(guard);
                if (guard == 'v' && guardRow == map.length - 1 ||
                    guard == '^' && guardRow == 0 ||
                    guard == '>' && guardCol == map[0].length - 1 ||
                    guard == '<' && guardCol == 0)
                    break

                if (counter > LIMIT) {
                    // console.error("Infinite loop detected!");
                    numberOfObstacles++
                    break;
                }
            }
        }
    }
    console.log(numberOfObstacles);
})();
