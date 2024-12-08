import {readFileSync} from 'fs';
import {Hashtable} from "../util/util";

const filePath = 'data.txt';
const fileContent = readFileSync(filePath, 'utf8');
let blocks = fileContent.split("-----")
let orderingRules = blocks[0].split("\r\n").filter(l => l !== "")
let pageNumberLines = blocks[1].split("\r\n").filter(l => l !== "")

// console.log(orderingRules);
// console.log(pageNumberLines);

const after: Hashtable<string> = {};
const before: Hashtable<string> = {};

for (let orderingRule of orderingRules) {
    let pair = orderingRule.split("|");
    if (!after[pair[0]])
        after[pair[0]] = []

    if (!before[pair[1]])
        before[pair[1]] = []

    after[pair[0]].push(pair[1])
    before[pair[1]].push(pair[0])
}
// console.log("Before")
// console.log(before);
// console.log("After")
// console.log(after);

let correctUpdates: string[][] = []
let incorrectUpdates: string[][] = []

for (let pageNumberLine of pageNumberLines) {
    let inAfter = true;
    let inBefore = true;
    let pageNumbers = pageNumberLine.split(",");
    for (let n = 0; n < pageNumbers.length; n++) {
        let num = pageNumbers[n]
        let beforeElement = before[num];
        let afterElement = after[num];
        for (let o = n + 1; o < pageNumbers.length; o++) {
            // o in after
            if (!(afterElement?.includes(pageNumbers[o]))) {
                inAfter = false
                break
            }
        }
        for (let m = n - 1; m >= 0; m--) {
            // m in before
            if (!(beforeElement?.includes(pageNumbers[m]))) {
                inBefore = false
                break
            }
        }

    }
    if (inAfter && inBefore) {
        correctUpdates.push(pageNumbers)
    } else {
        incorrectUpdates.push(pageNumbers)
    }
}
// console.table(correctUpdates);
// console.table(incorrectUpdates);

// Part 1
let result = 0
for (let correctUpdate of correctUpdates) {
    result += +correctUpdate[(correctUpdate.length - 1) / 2]
}

console.log(result);

// Part 2
let correctedUpdates: string[][] = []

for (let incorrectUpdate of incorrectUpdates) {
    let correctedUpdate: string[] = [incorrectUpdate[0]]

    for (let i = 1; i < incorrectUpdate.length; i++) {
        let page = incorrectUpdate[i];
        let befores = before[page];

        let insertPoint = incorrectUpdate.length - 1
        for (let j = 0; j < correctedUpdate.length; j++) {
            if (befores?.includes(correctedUpdate[j])) {
                insertPoint = j
                break
            }
        }
        correctedUpdate.splice(insertPoint, 0, page)
    }
    correctedUpdates.push(correctedUpdate)
}

let result2 = 0
for (let correctedUpdate of correctedUpdates) {
    result2 += +correctedUpdate[(correctedUpdate.length - 1) / 2]
}

console.log(result2);
