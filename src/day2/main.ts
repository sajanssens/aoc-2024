import {readFileSync} from 'fs';

const filePath = 'data.txt';
const fileContent = readFileSync(filePath, 'utf8');
let lines = fileContent.split("\r\n")

let safe1 = 0
let safe2 = 0

for (let line of lines) {
    if (line === "") continue

    let reports = line
        .split(/\s+/)
        .map(w => +w)
        .filter(l => l > 0)


    // Part 1
    if ((isDescending(reports) || isAscending(reports))
        && isSafe(reports)) {
        safe1++
    }

    for (let i = 0; i < reports.length; i++) {
        let reportsPart = [...reports];
        reportsPart.splice(i, 1)
        if ((isDescending(reportsPart) || isAscending(reportsPart))
            && isSafe(reportsPart)) {
            safe2++
            break
        }
    }

}
console.log(safe1)
console.log(safe2)


function isDescending(arr: number[]): boolean {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i + 1]) {
            return false;
        }
    }
    return true;
}

function isAscending(arr: number[]): boolean {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false
        }
    }
    return true
}

function isSafe(arr: number[]): boolean {
    let removedOne = false;
    for (let i = 0; i < arr.length - 1; i++) {
        let diff = Math.abs(arr[i] - arr[i + 1])
        if (diff < 1 || diff > 3) {
            return false
        }
    }
    return true
}

function isSafeDescending(arr: number[]): boolean {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i + 1]) {
            return false;
        }
    }
    return true;
}

function isSafeAscending(arr: number[]): boolean {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false
        }
    }
    return true
}
