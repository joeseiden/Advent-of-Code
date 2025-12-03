import { readFileSync } from "fs";

const exampleInput = readFileSync('./inputs/day1_example.txt', 'utf8');
const input = readFileSync('./inputs/day1.txt', 'utf8');

const MAX_VALUE = 100
const START_POS = 50

const parseInput = (input) => {
   return input.split('\n').map(command => [command[0], parseInt(command.slice(1))])  
}

const part1 = (input) => {
    const parsedInput = parseInput(input);
    let currentPos = START_POS
    let zeroCount = 0
    parsedInput.forEach(command => {
        currentPos = executeCommand(currentPos, command)
        if(currentPos === 0) {
            zeroCount++
        }
    });
    
    return zeroCount;
}

const executeCommand = (currentPos, command) => {
    const direction = command[0]
    const distance = command[1] % MAX_VALUE
    let newPos
    if (direction === 'R') {
        newPos = (currentPos + distance) % MAX_VALUE
    } else if (direction === 'L') {
        newPos = (currentPos - distance)
        if(newPos < 0) {
            newPos = MAX_VALUE + newPos
        }
    }
    return newPos
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    const parsedInput = parseInput(input);
    return true;
}

// console.log(`Part 2 example solution: ${part2(exampleInput)}`);
// console.log(`Part 2 solution: ${part2(input)}`);
