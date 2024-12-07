import {readFileSync} from 'fs';
import {generatePaddedNumbers} from "../util/util";

let start = Date.now()

const filePath = 'data.txt';
const fileContent = readFileSync(filePath, 'utf8');
let lines = fileContent.split("\r\n").filter(line => line !== "");

// let numberOfOperators = 2; // part 1
let numberOfOperators = 3; // part 2

(function () {
    let result = 0;

    for (let line of lines) {
        let lineSplit = line.split(":")
        let expected = +lineSplit[0].trim()
        let operands = lineSplit[1].trim().split(" ").map(o => +o)
        let operatorCombinations = generatePaddedNumbers(operands.length - 1, numberOfOperators)

        for (let operators of operatorCombinations) {
            let actual = operands[0]
            for (let i = 1; i < operands.length; i++) {
                if (operators[i - 1] === '0') { //          +
                    actual += operands[i]
                } else if (operators[i - 1] === '1') { //   *
                    actual *= operands[i]
                } else if (operators[i - 1] === '2') { //   || (part 2)
                    actual = +(actual + "" + operands[i])
                }
            }
            if (actual === expected) {
                result += actual
                break
            }
        }
    }
    console.log(`Result: ${result} took ${Date.now() - start}ms`);
})();
