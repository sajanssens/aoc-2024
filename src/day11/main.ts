import {readFileSync} from 'fs';

let start = Date.now()
const filePath = 'data.txt';
const fileContent = readFileSync(filePath, 'utf8');
let lines = fileContent.split("\r\n").filter(line => line !== "");

// Part 1
(function () {
    let result = 0;
    let numbers = lines[0].split(" ").map(n => +n)

    for (let i = 0; i < 25; i++) {
        let next: number[] = []
        for (let number of numbers) {
            let numberToString = number.toString();
            if (number === 0) {
                next.push(1)
            } else if (numberToString.length % 2 === 0) {
                next.push(+(numberToString.substring(0, numberToString.length / 2)))
                next.push(+(numberToString.substring(numberToString.length / 2, numberToString.length)))

            } else {
                next.push(number * 2024)
            }
        }
        numbers = next
    }

    result = numbers.length
    console.log(`Result: ${result} took ${Date.now() - start}ms`);
})();

// Part 2
(function () {
    let result = 0;

    console.log(`Result: ${result} took ${Date.now() - start}ms`);
})();
