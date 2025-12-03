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
        currentPos = executeCommand(currentPos, command[0], command[1] % MAX_VALUE).newPos
        if(currentPos === 0) {
            zeroCount++
        }
    });
    
    return zeroCount;
}

const executeCommand = (currentPos, direction, distance) => {
    let didPassZero = false
    let newPos
    if (direction === 'R') {
        if (currentPos + distance > MAX_VALUE) {
            didPassZero = true
        }
        newPos = (currentPos + distance) % MAX_VALUE
    } else if (direction === 'L') {
        newPos = (currentPos - distance)
        if(newPos < 0) {
            if(currentPos !== 0) {
                didPassZero = true
            }
            newPos = MAX_VALUE + newPos
        }
    }
    return { newPos, didPassZero }
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    const parsedInput = parseInput(input);
    let currentPos = START_POS
    let zeroCount = 0
    parsedInput.forEach(command => {
        // console.log(currentPos, command, zeroCount);
        
        const rotationCount = Math.floor(command[1] / MAX_VALUE)
        zeroCount = zeroCount + rotationCount
        const { newPos, didPassZero } = executeCommand(currentPos, command[0], command[1] % MAX_VALUE)
        if(newPos === 0 || didPassZero) {
            zeroCount++
        }
        currentPos = newPos
    });

    return zeroCount;
}

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
