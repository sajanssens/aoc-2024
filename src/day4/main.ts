import {readFileSync} from 'fs';
import {toCharMatrix} from "../util/util";

const filePath = 'data.txt';
const fileContent = readFileSync(filePath, 'utf8');
let lines = fileContent.split("\r\n")

let result = 0

// Part 1
// Horizontal
result += countHorizontalBothWays(lines);

// Vertical
const charMatrix = toCharMatrix(lines);
let transposedLines = toLines(transpose(charMatrix))
result += countHorizontalBothWays(transposedLines);

// Diagonal
let rotatedLines = toLines(rotate45Degrees(charMatrix));
result += countHorizontalBothWays(rotatedLines);

rotatedLines = toLines(rotateMinus45Degrees(charMatrix));
result += countHorizontalBothWays(rotatedLines);

// Result:
console.log(result);

// Part 2
let result2 = 0
const charMatrix2 = toCharMatrix(lines);
for (let x = 0; x < charMatrix2[0].length - 1; x++) {
    for (let y = 0; y < charMatrix2.length - 1; y++) {
        let field3x3 = extractSubmatrix(charMatrix2, x, y)

        let rotatedLines = toLines(rotate45Degrees(field3x3));
        let hit1 = (rotatedLines[2].match(/MAS/)?.length ?? 0) == 1 || (rotatedLines[2].match(/SAM/)?.length ?? 0) == 1;

        let rotatedMinusLines = toLines(rotateMinus45Degrees(field3x3));
        let hit2 = (rotatedMinusLines[2].match(/MAS/)?.length ?? 0) == 1 || (rotatedMinusLines[2].match(/SAM/)?.length ?? 0) == 1;

        if (hit1 && hit2)
            result2++
    }
}
console.log(result2);


// Utils:
function countHorizontalBothWays(lines: string[]) {
    let count = 0

    for (let line of lines) {
        if (line === "") continue

        count += countMatches(line);

        let lineReversed = line.split("").reverse().join("");
        count += countMatches(lineReversed)
    }

    return count
}

function countMatches(line: string) {
    return line.match(/XMAS/g)?.length ?? 0;
}


function transpose(matrix: string[][]) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

function toLines(charMatrix: string[][]) {
    return charMatrix.map(row => row.join(""));
}

function rotate45Degrees(matrix: string[][]): string[][] {
    const n = matrix.length;
    const diagonals: string[][] = [];

    // Initialize diagonals array to hold 2n - 1 rows (for all possible diagonals)
    for (let i = 0; i < 2 * n - 1; i++) {
        diagonals.push([]);
    }

    // Map each matrix element to its corresponding diagonal
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            diagonals[row + col].push(matrix[row][col]);
        }
    }

    return diagonals;
}

function rotateMinus45Degrees(matrix: string[][]): string[][] {
    const n = matrix.length;
    const diagonals: string[][] = [];

    // Initialize diagonals array to hold 2n - 1 rows (for all possible diagonals)
    for (let i = 0; i < 2 * n - 1; i++) {
        diagonals.push([]);
    }

    // Map each matrix element to its corresponding diagonal based on (row - col)
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            const diagIndex = row - col + (n - 1); // Shift to handle negative indices
            diagonals[diagIndex].push(matrix[row][col]);
        }
    }

    return diagonals;
}

function extractSubmatrix(matrix: string[][], startRow: number, startCol: number, size: number = 3): string[][] {
    const submatrix: string[][] = [];

    for (let i = 0; i < size; i++) {
        const row = matrix[startRow + i].slice(startCol, startCol + size);
        submatrix.push(row);
    }

    return submatrix;
}
