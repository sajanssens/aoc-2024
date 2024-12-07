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
