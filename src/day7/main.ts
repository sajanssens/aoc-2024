import {readFileSync} from 'fs';
import {generateBaseNumbers} from "../util/util";

const filePath = 'test.txt';
const fileContent = readFileSync(filePath, 'utf8');
let lines = fileContent.split("\r\n").filter(line => line !== "");
// console.log(lines);

// Part 1
(function () {
    let numberOfHits = 0;
    let result = 0;
    for (let line of lines) {
        let splitLine = line.split(":")
        let expected = +splitLine[0].trim()
        let operands = splitLine[1].trim().split(" ").map(o => +o)
        let operatorCombinations = generateBaseNumbers(operands.length - 1, 3)

        // console.log(expected);
        // console.log(operands);
        // console.log(operatorCombinations);

        for (let operators of operatorCombinations) {
            let actual = operands[0]
            for (let i = 1; i < operands.length; i++) {
                if (operators[i - 1] === '0') {
                    actual += operands[i]
                } else if (operators[i - 1] === '1') {
                    actual *= operands[i]
                } else if (operators[i - 1] === '2') {
                    // actual = operands[i]
                }
            }
            if (actual === expected) {
                numberOfHits++
                result += actual
                break
            }

        }
    }

    console.log(`Part 1: ${numberOfHits} - ${result}`);
})();

// Part 2
(function () {
    let result = 0;
    console.log(`Part 2: ${result}`);
})();
