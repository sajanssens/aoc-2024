import {readFileSync} from 'fs';

const filePath = 'data.txt';
const fileContent = readFileSync(filePath, 'utf8');
let lines = fileContent.split("\r\n")

let left = new Array<number>();
let right = new Array<number>();

for (let line of lines) {
    let words = line
        .split(/\s+/)
        .filter(word => word.length > 0)

    if (words[0]) {
        left.push(+words[0])
        right.push(+words[1])
    }
}

left = left.sort((a, b) => a - b);
right = right.sort((a, b) => a - b);


let dist = 0
for (let i = 0; i < left.length; i++) {
    dist += Math.abs(left[i] - right[i])
}
console.log(dist);

let similarity = 0
for (let number of left) {
    let length = right.filter(n => n===number).length;
    similarity += number * length
}

console.log(similarity);
