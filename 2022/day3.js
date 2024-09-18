import { readFileSync } from "fs";

const inputArray = readFileSync('./inputs/day3.txt', 'utf8').split('\n');
const exampleInputArray = readFileSync('./inputs/day3_example.txt', 'utf8').split('\n');

const priority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const splitRucksack = (rucksack) => {
    return [rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)];
};

const part1 = (rucksackArray) => {
    let sum = 0;
    rucksackArray.forEach((rucksack) => {
        sum += findPriorityValue(rucksack);
    })
    return sum;
}

const findPriorityValue = (rucksack) => {
    const [firstComp, secondComp] = splitRucksack(rucksack);

    const firstCompSet = new Set(firstComp.split(''));
    const secondCompSet = new Set(secondComp.split(''));
    
    const dupe = firstCompSet.intersection(secondCompSet).values().next().value;
    
    return priority.indexOf(dupe) + 1;
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
    const [firstElfSet, secondElfSet, thirdElfSet] = elfGroup.map(rucksack => new Set(rucksack.split('')));

    const groupBadge = firstElfSet.intersection(secondElfSet).intersection(thirdElfSet).values().next().value;
    return priority.indexOf(groupBadge) + 1;
}

console.log(`Part 2 example input solution: ${part2(exampleInputArray)}`);
console.log(`Part 2 solution: ${part2(inputArray)}`);