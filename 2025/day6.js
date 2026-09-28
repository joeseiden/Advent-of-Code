import { readFileSync } from "fs";
import { splitAndParseInt, splitInputStringToArray, parseArrToInt, sum, product, splitArrOnDelimiter } from "../lib/index.js";
import _ from "lodash";
import { log } from "console";

const exampleInput = readFileSync('./inputs/day6_example.txt', 'utf8');
const input = readFileSync('./inputs/day6.txt', 'utf8');

const parseInputPart1 = (input) => {
   return (
    _.zip(...input
    .split('\n') //split on newlines to get each row as a string
    .map(
        row => row.split(' ').filter(el => el !== '') //split on spaces, then remove empty string elements because not all numbers/operators are spaced evenly
            )
        )
    )
}


const part1 = (input) => {
    const parsedInput = parseInputPart1(input);
    const problemSolutions = parsedInput.map(row => {
        const operator = row.pop();
        const numbers = parseArrToInt(row)
        if(operator === "+") {
            return sum(numbers)
        } else if (operator === "*") {
            return product(numbers)
        }
    });
    return sum(problemSolutions);
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const parseInputPart2 = (input) => {
    const rows = input.split('\n');
    // get operators from last row, and reverse because cephalopods do math right-to-left
    const operators = rows.pop().split('').filter(el => el === "+" || el === "*").reverse();
    // split rows into sub arrays and reverse to match cephalopod ordering
    const splitRows = rows.map(row => row.split('').reverse());
    // zip split rows to turn columns into rows
    const zippedRows = _.zip(...splitRows);
    // join subarrays and split on the elements that are not numbers (returned undefined by parseArrToInt())
    const numbers = splitArrOnDelimiter(
        parseArrToInt(zippedRows.map(subArr => subArr.join(''))), 
        undefined
    );

    return { numbers, operators }
}

const part2 = (input) => {
    const { numbers, operators } = parseInputPart2(input);
    const problemSolutions = operators.map((operator, i) => {
        if(operator === "+") {
            return sum(numbers[i])
        } else if (operator === "*") {
            return product(numbers[i])
        }
    })
    return sum(problemSolutions)
}

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);