import { readFileSync } from "fs";

const exampleInput = readFileSync('./inputs/day1_example.txt', 'utf8').split('\n').map(num => parseInt(num));
const input = readFileSync('./inputs/day1.txt', 'utf8').split('\n').map(num => parseInt(num));;

const part1 = (input) => {
    let count = 0;
    let prev = Infinity;
    input.forEach(measurement => {
        if(measurement > prev) {
            count++
        };
        prev = measurement;
    })
    return count;
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    let increaseCount = 0;
    let prevSum = Infinity;
    for(let i = 2; i < input.length; i++) {
        const windowSum = input[i - 2] + input[i - 1] + input[i];
        if(windowSum > prevSum) {
            increaseCount++
        };
        prevSum = windowSum;
    }
    return increaseCount;
}

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
