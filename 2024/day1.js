import { readFileSync } from "fs";
import { sum } from '../lib/index.js';
import _ from 'lodash';

const exampleInput = readFileSync('./inputs/day1_example.txt', 'utf8');
const input = readFileSync('./inputs/day1.txt', 'utf8');

const parseInput = (input) => {
    return input.split('\n').map(pair => pair.split('   ').map(num => parseInt(num)));
}

const part1 = (input) => {
    const list = parseInput(input);
    const zippedList = _.zip(...list);
    const sortedZipList = zippedList.map(subArr => subArr.sort());
    const sortedPairs = _.zip(...sortedZipList);
    const distances = sortedPairs.map(pair => Math.abs(pair[0] - pair[1]));
    const totalDistance = sum(distances)
    
    return totalDistance;
}


console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    const list = parseInput(input);
    const [leftList, rightList] = _.zip(...list);
    const rightListOccurences = _.countBy(rightList);
    const similarityScore = sum(leftList.map(num => num * rightListOccurences[num] || 0));
    
    return similarityScore;
}

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);


