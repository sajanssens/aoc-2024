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

