import {readFileSync} from 'fs';

let result = 0
const regex = /mul\(\d+,\d+\)/g

const filePath = 'data.txt';
let file = readFileSync(filePath, 'utf8');
let line = file.split(/[\r\n]/gm).join("")

// Part 2
// line = line.replace(/don't\(\).*?do\(\)/g, "")
// line = line.replace(/don't\(\).*/g, "")

// Part 1
let matches = line.matchAll(regex);
for (let match of matches) {
    // console.log(match.toString())
    let operands = match[0].matchAll(/\d+/g);
    const pair = new Array<number>
    for (let operand of operands) {
        pair.push(+operand[0]);
    }
    result += pair[0] * pair[1]
}
console.log(result);
