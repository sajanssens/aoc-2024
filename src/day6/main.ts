import {readFileSync} from 'fs';
import {countOccurrences, findElementPosition, toCharMatrix} from "../util/util";

const filePath = 'test.txt';
const fileContent = readFileSync(filePath, 'utf8');
let lines = fileContent.split("\r\n")
let map = toCharMatrix(lines);

// console.table(map);

let guard = '^';
let guardPos = findElementPosition(map, guard);
let guardRow = guardPos[0]
let guardCol = guardPos[1]
// console.log(guardPos);

let counter = 0;
const LIMIT = 1000000; // Max allowed iterations

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

    if (counter > LIMIT) {
        // console.error("Infinite loop detected!");
        break;
    }
}
// console.table(map);

let result1 = countOccurrences(map, 'X') + 1
console.log(result1);
