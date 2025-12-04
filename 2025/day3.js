import { readFileSync } from "fs";
import { splitAndParseInt, reduceDigitsToOneNumber, sum } from "../lib/index.js";

const exampleInput = readFileSync('./inputs/day3_example.txt', 'utf8');
const input = readFileSync('./inputs/day3.txt', 'utf8');

const parseInput = (input) => {
    return input.split('\n').map(bank => splitAndParseInt(bank, ''))
}

const part1 = (input) => {
    const batteryBanks = parseInput(input);
    const joltages = []

    batteryBanks.forEach(bank => {
        let maxJoltage = 0

        for (let i = 0; i < bank.length - 1; i++) {
            for (let j = i + 1; j < bank.length; j++) {
                const currentJoltage = reduceDigitsToOneNumber([bank[i], bank[j]])
                maxJoltage = Math.max(currentJoltage, maxJoltage)
            }
        }
        joltages.push(maxJoltage)
    })
    
    return sum(joltages);
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    const batteryBanks = parseInput(input);
    const joltages = []

    batteryBanks.forEach(bank => {
        joltages.push(findJoltage(bank, 12))
    })
    
    return sum(joltages);
}

const findJoltage = (bank, joltageLength, currentJoltage = []) => {
    if(!joltageLength) return currentJoltage;
    const maxDigit = Math.max(...bank.slice(0, bank.length - joltageLength + 1));
    const maxDigitIndex = bank.indexOf(maxDigit);
    return findJoltage(bank.slice(maxDigitIndex + 1), joltageLength - 1, currentJoltage * 10 + maxDigit)
}

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
