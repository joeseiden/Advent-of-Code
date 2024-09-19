import { readFileSync } from "fs";

const input = readFileSync('./inputs/day6.txt', 'utf8');
const exampleInputArray = readFileSync('./inputs/day6_example.txt', 'utf8').split('\n');

const part1 = (input) => {
    const markerLength = 4

    for(let i = 0; i + markerLength < input.length; i++) {
        if(isStringAllUniq(input.slice(i, i + markerLength))) {
            return i + markerLength;
        } 
    }
    return -1;
};

const isStringAllUniq = (str) => {
    return str.length == new Set(str.split('')).size
}

console.log(exampleInputArray.map(input => `Part 1 solution for example input ${input}: ${part1(input)}`));
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    const markerLength = 14

    for(let i = 0; i + markerLength < input.length; i++) {
        if(isStringAllUniq(input.slice(i, i + markerLength))) {
            return i + markerLength;
        }
    }
    return -1;
}

console.log(exampleInputArray.map(input => `Part 2 solution for example input ${input}: ${part2(input)}`));
console.log(`Part 2 solution: ${part2(input)}`);