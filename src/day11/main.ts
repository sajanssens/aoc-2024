import {readFileSync} from 'fs';

let start = Date.now()
const filePath = 'data.txt';
const fileContent = readFileSync(filePath, 'utf8');
let lines = fileContent.split("\r\n").filter(line => line !== "");


// Part 1 & 2
(function () {
    let result = 0;
    let numbers = new Map<number, number>()
    lines[0].split(" ").map(n => +n).forEach(n => numbers.set(n, 1));

    for (let i = 0; i < 75; i++) {
        let nextNumbers = new Map<number, number>()
        for (let number of numbers) {
            let numberValue = number[0];
            let numberAmount = number[1];
            let numberValueToString = numberValue.toString();
            if (numberValue === 0) {
                addOrUpdateWith(nextNumbers, 1, numberAmount);
            } else if (numberValueToString.length % 2 === 0) {
                let leftPart = +(numberValueToString.substring(0, numberValueToString.length / 2));
                let rightPart = +(numberValueToString.substring(numberValueToString.length / 2, numberValueToString.length));
                addOrUpdateWith(nextNumbers, leftPart, numberAmount)
                addOrUpdateWith(nextNumbers, rightPart, numberAmount)
            } else {
                addOrUpdateWith(nextNumbers, numberValue * 2024, numberAmount)
            }
        }
        numbers = nextNumbers
    }

    result = Array.from(numbers.values()).reduce((acc, value) => acc + value, 0);
    console.log(`Result: ${result} took ${Date.now() - start}ms`);
})();

function addOrUpdateWith(map: Map<number, number>, key: number, value: number) {
    let currentAmount = map.get(key);
    if (currentAmount)
        map.set(key, currentAmount + value)
    else
        map.set(key, value)
}
