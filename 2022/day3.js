import { readFileSync } from "fs";
import _ from "lodash";

const inputArray = readFileSync('./inputs/day3.txt', 'utf8').split('\n');
const exampleInputArray = readFileSync('./inputs/day3_example.txt', 'utf8').split('\n');

const priority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const splitRucksack = (rucksack) => {
    return [rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)];
};

const priorityValue = (char) => {
    return priority.indexOf(char) + 1;
}

const part1 = (rucksackArray) => {
    let sum = 0;
    rucksackArray.forEach((rucksack) => {
        sum += findDupeValue(rucksack);
    })
    return sum;
}

const findDupeValue = (rucksack) => {
    const [firstComp, secondComp] = splitRucksack(rucksack).map(compartment => compartment.split(''));
    
    const dupe = _.intersection(firstComp, secondComp)[0];
    
    return priorityValue(dupe);
};

console.log(`Part 1 example input solution: ${part1(exampleInputArray)}`);
console.log(`Part 1 solution: ${part1(inputArray)}`);

const part2 = (rucksackArray) => {
    let sum = 0;
    for(let i = 0; i < rucksackArray.length; i += 3) {
        sum += findGroupPriorityValue(rucksackArray.slice(i, i + 3));
    }
    return sum;
};

const findGroupPriorityValue = (elfGroup) => {
    const [firstElf, secondElf, thirdElf] = elfGroup.map(rucksack => rucksack.split(''));

    const groupBadge = _.intersection(firstElf, secondElf, thirdElf)[0];
    
    return priorityValue(groupBadge);
}

console.log(`Part 2 example input solution: ${part2(exampleInputArray)}`);
console.log(`Part 2 solution: ${part2(inputArray)}`);