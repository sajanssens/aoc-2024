import {readFileSync} from 'fs';

const filePath = 'test.txt';
const fileContent = readFileSync(filePath, 'utf8');
let lines = fileContent.split("\r\n")

for (let line of lines) {
    if (line === "") continue

    let reports = line
        .split(/\s+/)
        .map(w => +w)
        .filter(l => l > 0)


    // Part 1

    // Part 2

}
