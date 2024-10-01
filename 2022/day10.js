import { readFileSync } from "fs";

const exampleInput = readFileSync('./inputs/day10_example.txt', 'utf8').split('\n').map(line => line.split(' '));
const input = readFileSync('./inputs/day10.txt', 'utf8').split('\n').map(line => line.split(' '));


const part1 = (input) => {
    const cycles = [1];
    input.forEach((instruction) => {
        const x = cycles.at(-1);

        cycles.push(x); //we add one tick regardless if instruction is noop or addx

        if(instruction[0] === 'addx') {
            cycles.push(x + parseInt(instruction[1]));
        }
    });

    return [20, 60, 100, 140, 180, 220].reduce((a,b) => a + cycles[b - 1] * b, 0);
}


console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    const cycles = [1];

    input.forEach((instruction) => {
        const x = cycles.at(-1);

        cycles.push(x);
        if(instruction[0] === 'addx') {
            cycles.push(x + parseInt(instruction[1]))
        }
    });

    const crtWidth = 40;
    const crtHeight = 6;
    
    const crtScreen = new Array(crtHeight);
    for(let i = 0; i < crtScreen.length; i++) {
        crtScreen[i] = new Array(crtWidth).fill('.');
    }
    
    cycles.slice(0,-1).forEach((cycle, i) => {
        const row = Math.floor(i / 40);
        const col = i % 40;

        if([col - 1, col, col + 1].includes(cycle)) {
            crtScreen[row][col] = '#'
        }
    })
    
    return crtScreen.map(line => line.join('')).join('\n');
    
}

console.log(`Part 2 example solution: \n${part2(exampleInput)}`);
console.log(`Part 2 solution: \n${part2(input)}`);