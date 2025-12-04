import { readFileSync } from "fs";
import { range, sum, splitStringIntoEvenParts, isAllElementsEqual } from '../lib/index.js'
import { log } from "console";

const exampleInput = readFileSync('./inputs/day2_example.txt', 'utf8');
const input = readFileSync('./inputs/day2.txt', 'utf8');

const parseInput = (input) => {
    const ranges = input.split(',')
    const explodedRanges = ranges.map(rangeStr => {
        const bounds = rangeStr.split('-')
        const start = parseInt(bounds[0])
        const end = parseInt(bounds[1])
        const numRange = range(end - start + 1, start)
        return numRange
    })
    return explodedRanges.flat()
}

const part1 = (input) => {
    const parsedInput = parseInput(input);
    
    
    const invalidIds = [];

    parsedInput.forEach(num => {
        const str = num.toString()
        const length = str.length
        if (str.substring(0, length / 2) === str.substring(length / 2)) {
            invalidIds.push(num)
        }
    })
    
    return sum(invalidIds);
}

// const isInvalidId = (num) => {
//     const str = num.toString();
//     for (let i = 0; i < str.length / 2; i++) {
//         for (let j = 1; j < str.length / 2; j++) {
//             const subStrLength = j - i;
//             const subStrToCheck = str.substring(i, j);
//             if (subStrToCheck === str.substring(j, j + subStrLength)) {
//                 return true
//             }
//         }
//     }
//     return false
// }



console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    const parsedInput = parseInput(input);

    const invalidIds = [];

    parsedInput.forEach(num => {
        const str = num.toString()
        for (let i = 2; i < str.length + 1; i++) {
            const chunkedString = splitStringIntoEvenParts(str, i)
            if(isAllElementsEqual(chunkedString)) {
                invalidIds.push(num)
                break;
            }
        }
    })
    
    return sum(invalidIds);
}



console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
