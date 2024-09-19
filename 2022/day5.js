import { readFileSync } from "fs";
import _ from "lodash";

const input = readFileSync('./inputs/day5.txt', 'utf8').split('\n\n');
const exampleInput = readFileSync('./inputs/day5_example.txt', 'utf8').split('\n\n');

const parseExampleStacks = (input) => {
    // complete this later
    return [
        [],
        'ZN'.split(''),
        'MCD'.split(''),
        'P'.split('')
    ];
};

const parseStacks = (input) => {

    return [
        '',
        'NCRTMZP',
        'DNTSBZ',
        'MHQRFCTG',
        'GRZ',
        'ZNRH',
        'FHSWPZLD',
        'WDZRCGM',
        'SJFLHWZQ',
        'SQPWN'
    ].map(stack => stack.split(''));
}

const parseInstructions = (input) => {
    const instructionsBlock = input[1];
    return [...instructionsBlock.split('\n').map(instruction => [...instruction.matchAll(/\d+/g)].map(num => parseInt(num)))]
};

const part1 = (input) => {
    // let stacks = parseExampleStacks();
    let stacks = parseStacks(input);
    const instructions = parseInstructions(input);


    instructions.forEach((instruction) => {
        const [count, start, dest] = instruction;
        const cratesToMove = stacks[start].slice(stacks[start].length - count).reverse();        
        stacks[start] = stacks[start].slice(0, stacks[start].length - count);
        stacks[dest].push(...cratesToMove);
    });

    const topCrates = stacks.map(stack => stack.at(-1));
    return topCrates.join('');
};

// console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

