import {readFileSync} from 'fs';

let start = Date.now()
const filePath = 'data.txt';
const fileContent = readFileSync(filePath, 'utf8');
let lines = fileContent.split("\r\n").filter(line => line !== "");

// Part 1
(function () {
    let result = 0;

    console.log(`Result: ${result} took ${Date.now() - start}ms`);
})();

// Part 2
(function () {
    let result = 0;

    console.log(`Result: ${result} took ${Date.now() - start}ms`);
})();
