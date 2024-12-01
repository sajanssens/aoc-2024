"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const filePath = 'data1.txt';
const fileContent = (0, fs_1.readFileSync)(filePath, 'utf8');
let lines = fileContent.split("\r\n");
// console.log(lines)
let left = new Array();
let right = new Array();
for (let line of lines) {
    // console.log(line);
    let words = line
        .split(/\s+/)
        .filter(word => word.length > 0);
    // console.log("words=" + (+words[0]))
    // console.log("words=" + (+words[1]))
    if (words[0]) {
        left.push(+words[0]);
        right.push(+words[1]);
    }
}
left = left.sort((a, b) => a - b);
right = right.sort((a, b) => a - b);
let dist = 0;
for (let i = 0; i < left.length; i++) {
    dist += Math.abs(left[i] - right[i]);
}
console.log(dist);
