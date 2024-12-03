import { readFileSync } from "fs";
import { splitAndParseInt, sum, product } from "../lib/index.js";

const exampleInput = readFileSync('./inputs/day3_example.txt', 'utf8');
const exampleInput2 = readFileSync('./inputs/day3_example2.txt', 'utf8');
const input = readFileSync('./inputs/day3.txt', 'utf8');

const parseInput = (input) => {
    return input.split('\n').join('');
}

const retrieveCommands = (str, regex) => {
    return [...str.matchAll(regex)].map(match => match[0]);
}

const retrieveMulFactors = (mulCommand) => {
    return splitAndParseInt([...mulCommand.matchAll(factorsRegex)].map(factor => factor[0])[0]);
}

const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g;
const factorsRegex = /\d{1,3},\d{1,3}/g;

const part1 = (input) => {
    const inputString = parseInput(input);

    const mulCommands = retrieveCommands(inputString, mulRegex);
    
    const mulFactors = mulCommands.map(
        command => retrieveMulFactors(command)
    );

    return sum(mulFactors.map(factors => product(factors)));
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const mulOrDoOrDontRegex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g

const part2 = (input) => {
    const inputString = parseInput(input);

    const allCommands = retrieveCommands(inputString, mulOrDoOrDontRegex);
    const mulFactors = [];
    let dontMul = false
    allCommands.forEach(command => {
        if(!dontMul && command.includes('mul')) {
            mulFactors.push(retrieveMulFactors(command));
        } else if (command == "don't()") {
            dontMul = true;
        } else if (command == "do()") {
            dontMul = false;
        }
    })

    return sum(mulFactors.map(factors => product(factors)));
}

console.log(`Part 2 example solution: ${part2(exampleInput2)}`);
console.log(`Part 2 solution: ${part2(input)}`);
