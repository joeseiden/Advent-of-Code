import { readFileSync } from "fs";

const exampleInput = readFileSync('./inputs/day2_example.txt', 'utf8').split('\n').map(line => line.split(' '));
const input = readFileSync('./inputs/day2.txt', 'utf8').split('\n').map(line => line.split(' '));

const part1 = (input) => {
    let horiPos = 0;
    let depth = 0;

    input.forEach((line) => {
        const direction = line[0];
        const distance = parseInt(line[1]);
        switch (direction) {
            case 'forward':
                horiPos += distance;
                break;
            case 'down':
                depth += distance;
                break;
            case 'up':
                depth -= distance;
                break;
            default:
                break;
        }
    })
    

    return horiPos * depth;
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

// const part2 = (input) => {
//     return true;
// }

// console.log(`Part 2 example solution: ${part2(exampleInput)}`);
// console.log(`Part 2 solution: ${part2(input)}`);
