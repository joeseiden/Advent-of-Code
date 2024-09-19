import { readFileSync } from "fs";
import _ from "lodash";

const input = readFileSync('./inputs/day5.txt', 'utf8').split('\n\n');
const exampleInput = readFileSync('./inputs/day5_example.txt', 'utf8').split('\n\n');

const parseStacks = (stacks) => {
    const zippedStacks = _.zip(...stacks.split('\n').map(line => line.split('')).reverse());

    let result = [[]];
    zippedStacks.forEach((stack) => {
        if(parseInt(stack[0])) {
            result.push(stack.slice(1).filter(el => el != ' '))
        }
    })
    return result;
}

const parseInstructions = (instructionsBlock) => {
    return [...instructionsBlock.split('\n').map(instruction => [...instruction.matchAll(/\d+/g)].map(num => parseInt(num)))]
};

const part1 = (input) => {
    let stacks = parseStacks(input[0]);
    const instructions = parseInstructions(input[1]);


    instructions.forEach((instruction) => {
        const [count, start, dest] = instruction;
        const cratesToMove = stacks[start].slice(stacks[start].length - count).reverse();        
        stacks[start] = stacks[start].slice(0, stacks[start].length - count);
        stacks[dest].push(...cratesToMove);
    });

    const topCrates = stacks.map(stack => stack.at(-1));
    return topCrates.join('');
};

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    let stacks = parseStacks(input[0]);
    const instructions = parseInstructions(input[1]);


    instructions.forEach((instruction) => {
        const [count, start, dest] = instruction;
        const cratesToMove = stacks[start].slice(stacks[start].length - count);        
        stacks[start] = stacks[start].slice(0, stacks[start].length - count);
        stacks[dest].push(...cratesToMove);
    });

    const topCrates = stacks.map(stack => stack.at(-1));
    return topCrates.join('');
};

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
