import { readFileSync } from "fs";

const exampleInput = readFileSync('./inputs/day10_example.txt', 'utf8');
const input = readFileSync('./inputs/day10.txt', 'utf8');

const parseInput = (input) => {
    return []
}

const part1 = (input) => {
    const parsedInput = parseInput(input);
    return true;
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    const parsedInput = parseInput(input);
    return true;
}

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
