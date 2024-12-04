import {readFileSync} from 'fs';

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

function toCharMatrix(lines: string[]) {
    return lines.map(str => str.split(""));
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

