import { readFileSync } from "fs";
import _ from "lodash";

const exampleInput = readFileSync('./inputs/day3_example.txt', 'utf8');
const input = readFileSync('./inputs/day3.txt', 'utf8');

const parseInput = (input) => {
    return input.split('\n').map((line) => line.split('').map(bit => parseInt(bit)))
}

const part1 = (input) => {
    const parsedInput = parseInput(input);
    const reportLength = parsedInput.length;
    const gammaRate = new Array(parsedInput[0].length);
    const epsilonRate = new Array(parsedInput[0].length);
    const zippedInput = _.zip(...parsedInput);
    const reducedReport = zippedInput.map((line) => line.reduce((a,b) => a + b));
    
    for (let i = 0; i < zippedInput.length; i++) {
        if(reducedReport[i] > reportLength / 2) {
            gammaRate[i] = 1;
            epsilonRate[i] = 0;
        } else {
            gammaRate[i] = 0;
            epsilonRate[i] = 1;
        }
    }

    const gammaDecimal = parseInt(gammaRate.join(''), 2);
    const epsilonDecimal = parseInt(epsilonRate.join(''), 2);

    return gammaDecimal * epsilonDecimal;
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const mostCommonBit = (arr) => {
    return arr.reduce((a,b) => a + b) >= arr.length / 2 ? 1 : 0;
}

const leastCommonBit = (arr) => {
    return arr.reduce((a,b) => a + b) >= arr.length / 2 ? 0 : 1;
}

const part2 = (input) => {
    const parsedInput = parseInput(input);
    const oxyGenRating = filterReport(parsedInput, mostCommonBit);
    const co2ScrubRating = filterReport(parsedInput, leastCommonBit);

    return parseInt(oxyGenRating.join(''), 2) * parseInt(co2ScrubRating.join(''), 2);
}

const filterReport = (report, filterFn) => {
    let values = report;
    
    let i = 0;
    while(values.length > 1) {
        const zippedVals = _.zip(...values);
        values = values.filter(line => line[i] == filterFn(zippedVals[i]));
        i++;
    }
    return values[0];
}

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
