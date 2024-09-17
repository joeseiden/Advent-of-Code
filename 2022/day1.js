import { readFileSync } from "fs";

const input = readFileSync('./inputs/day1.txt', 'utf8');
const inputArray = input.split('\n\n');

const exampleInput = readFileSync('./inputs/day1_example.txt', 'utf8');
const exampleInputArray = exampleInput.split('\n\n');

const part1 = (elvesTable) => {
    const totalCalsByElf = elvesTable.map((elf) => {
        return elf.split('\n').map(food => parseInt(food)).reduce((a,b) => a + b);
    });
    
    return Math.max(...totalCalsByElf);
};

console.log(`Part 1 example solution: ${part1(exampleInputArray)}`);
console.log(`Part 1 main solution: ${part1(inputArray)}`);

const part2 = (elvesTable) => {
    const totalCalsByElf = elvesTable.map((elf) => {
        return elf.split('\n').map(food => parseInt(food)).reduce((a,b) => a + b);
    });
    
    return totalCalsByElf.sort((a,b) => b - a).slice(0, 3).reduce((a, b) => a + b);
}

console.log(`Part 2 example solution: ${part2(exampleInputArray)}`);
console.log(`Part 2 solution: ${part2(inputArray)}`);
