import { readFileSync } from "fs";

const exampleInput = readFileSync('./inputs/day10_example.txt', 'utf8').split('\n').map(line => line.split(' '));
const input = readFileSync('./inputs/day10.txt', 'utf8').split('\n').map(line => line.split(' '));


const part1 = (input) => {
    const cycles = [1];

    input.forEach((instruction) => {
        if(instruction[0] === 'noop') {
            cycles.push(cycles.at(-1));
        } else if(instruction[0] === 'addx') {
            cycles.push(cycles.at(-1), cycles.at(-1) + parseInt(instruction[1]))
        }
    });
    return [20, 60, 100, 140, 180, 220].reduce((a,b) => a + cycles[b - 1] * b, 0);
    
}


console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);