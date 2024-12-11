import {readFileSync} from 'fs';
import {indexOfBlock} from "../util/util";

let start = Date.now()
const filePath = 'data.txt';
const fileContent = readFileSync(filePath, 'utf8');
let lines = fileContent.split("\r\n").filter(line => line !== "");

interface Block {
    value: string
}

// Part 1
(function () {

    let result = 0;
    let diskMap = lines[0];
    let blocks: Block[] = []
    let spaceBlock: Block = {value: "."}
    let xBlock: Block = {value: "X"}

    // build blocks
    for (let i = 0; i < diskMap.length; i = i + 2) {
        let counter = i / 2
        let length = diskMap[i];
        let spaces = diskMap[i + 1];

        let fileBlock = {value: counter + ""}

        for (let j = 0; j < +length; j++) {
            blocks.push(fileBlock)
        }

        for (let j = 0; j < +spaces; j++) {
            blocks.push(spaceBlock)
        }
    }

    // console.log(blocks.map(b => b.value).join(""));
    let amountOfFileBlocks = blocks.filter(c => c !== spaceBlock).length;

    // compact blocks
    for (let i = blocks.length - 1; i > amountOfFileBlocks - 1; i--) {
        let blockToMove = blocks[i];
        if (blockToMove === spaceBlock) {
            blocks[i] = xBlock
            continue
        }
        let destinationIndex = blocks.indexOf(spaceBlock);
        blocks[destinationIndex] = blockToMove
        blocks[i] = xBlock
    }

    blocks = blocks.filter(c => c !== xBlock)

    let checksum = 0
    for (let i = 0; i < blocks.length; i++) {
        checksum += +blocks[i].value * i
    }

    result = checksum
    console.log(`Result: ${result} | it took ${Date.now() - start} ms`);
});

// Part 2
(function () {
    let result = 0;
    let diskMap = lines[0];
    let blocks: Block[] = []
    let spaceBlock: Block = {value: "."}
    let xBlock: Block = {value: "X"}

    // build blocks
    for (let i = 0; i < diskMap.length; i = i + 2) {
        let counter = i / 2
        let length = diskMap[i];
        let spaces = diskMap[i + 1];
        let fileBlock = {value: counter + ""}

        for (let j = 0; j < +length; j++) {
            blocks.push(fileBlock)
        }

        for (let j = 0; j < +spaces; j++) {
            blocks.push(spaceBlock)
        }
    }

    // compact blocks
    let i = blocks.length - 1
    while (i > 0) {
        let blockToMove = blocks[i];

        if (blockToMove === spaceBlock) {
            blocks[i] = xBlock
            i--
            continue
        }

        // create the group of blocks to be moved
        let blocksToMove: Block[] = []
        while (blocks[i] === blockToMove) {
            blocksToMove.push(blocks[i])
            i--
        }

        // move to first free space if available
        let destinationIndex = indexOfBlock(blocks, Array(blocksToMove.length).fill(spaceBlock))
        if (destinationIndex !== -1) {
            // copy whole block forward
            blocks.splice(destinationIndex, blocksToMove.length, ...blocksToMove)

            // delete original blocks on old position
            let xBlocks = Array(blocksToMove.length).fill(xBlock)
            blocks.splice(i + 1, blocksToMove.length, ...xBlocks)
        }
    }

    let checksum = 0
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] === spaceBlock || blocks[i] === xBlock) continue
        checksum += +blocks[i].value * i
    }

    result = checksum
    console.log(`Result: ${result} | it took ${Date.now() - start} ms`);
})();


