import {readFileSync} from 'fs';

const filePath = 'data.txt';
const fileContent = readFileSync(filePath, 'utf8');
let lines = fileContent.split("\r\n").filter(line => line !== "");

// Part 1
(function () {
    let result = 0;

    console.log(result);
})();

// Part 2
(function () {
    let result = 0;

    console.log(result);
})();
