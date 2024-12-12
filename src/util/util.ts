export type Hashtable<T> = {
    [key: string]: T[];
};

export type Location = [row: number, col: number]

export function toCharMatrix(lines: string[]) {
    return lines.filter(l => l !== "").map(str => str.split(""));
}

export function findElementPosition<T>(matrix: T[][], target: T): [number, number] {
    for (let row = 0; row < matrix.length; row++) {
        const col = matrix[row].indexOf(target); // Check the current row
        if (col !== -1) {
            return [row, col]; // Return row and column as a tuple
        }
    }
    return [-1, -1]; // Return null if the element is not found
}

export function countOccurrences<T>(matrix: T[][], target: T): number {
    let count = 0;
    for (const row of matrix) {
        count += row.filter((element) => element === target).length;
    }
    return count;
}

export function generatePaddedNumbers(numberOfDigits: number, base: number = 2): string[] {
    const binaryNumbers: string[] = [];
    const totalNumbers = Math.pow(base, numberOfDigits); // 2^numberOfDigits numbers

    for (let i = 0; i < totalNumbers; i++) {
        const binary = i.toString(base).padStart(numberOfDigits, '0'); // Ensure numberOfDigits digits with leading zeros
        binaryNumbers.push(binary);
    }

    return binaryNumbers;
}

export function isEqual<T extends readonly unknown[]>(t1: T, t2: T): boolean {
    if (t1.length !== t2.length) {
        return false;
    }
    return t1.every((value, index) => value === t2[index]);
}

export function create2DArray<T>(rows: number, cols: number, value: T): T[][] {
    return Array.from({length: rows}, () => Array(cols).fill(value));
}

export const isBetween = <T extends number>(value: T, min: T, max: T, inclusive: boolean = false): boolean => {
    return inclusive
        ? value >= Math.min(min, max) && value <= Math.max(min, max)
        : value > Math.min(min, max) && value < Math.max(min, max);
};

export function replaceCharacter(str: string, index: number, newChar: string): string {
    if (index < 0 || index >= str.length) {
        throw new Error("Index out of range.");
    }
    return str.slice(0, index) + newChar + str.slice(index + 1);
}

export function replaceAllCharacters(str: string, target: string, replacement: string): string {
    return str.split(target).join(replacement);
}

export function indexOfBlock<T>(array: T[], block: T[]): number {
    const blockLength = block.length;

    for (let i = 0; i <= array.length - blockLength; i++) {
        if (array.slice(i, i + blockLength).every((value, index) => value === block[index])) {
            return i; // Found the start index
        }
    }
    return -1; // Not found
}

export function getHorizontalNeighbors<T>(matrix: T[][], row: number, col: number): T[] {
    const neighbors: T[] = [];
    const directions = [
        [-1, 0],  // Up
        [1, 0],   // Down
        [0, -1],  // Left
        [0, 1],   // Right
        // [-1, -1], // Top-left
        // [-1, 1],  // Top-right
        // [1, -1],  // Bottom-left
        // [1, 1],   // Bottom-right
    ];

    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        // Check boundaries
        if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[0].length) {
            neighbors.push(matrix[newRow][newCol]);
        }
    }

    return neighbors;
}
