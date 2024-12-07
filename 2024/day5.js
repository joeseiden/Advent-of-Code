import { readFileSync } from "fs";
import { findMiddleElement, sum } from "../lib/index.js";

const exampleInput = readFileSync('./inputs/day5_example.txt', 'utf8');
const input = readFileSync('./inputs/day5.txt', 'utf8');

const parseInput = (input) => {
    const [rawRules, rawUpdatePages] = input.split('\n\n');
    let rules = {}; // An object where the keys are the pages, and their values are an array of pages they must NOT be followed by
    rawRules.split('\n').forEach(line => {
        const rule = line.split('|');
        
        rules[rule[1]] ? rules[rule[1]].push(rule[0]) : rules[rule[1]] = [rule[0]]
    });
    const updatePages = rawUpdatePages.split('\n').map(line => line.split(','));
    return [rules, updatePages];
}

const part1 = (input) => {
    const [rules, updatePages] = parseInput(input);
    const validUpdates = [];
    updatePages.forEach(update => {
        if(isValidUpdate(update, rules)) {
            validUpdates.push(update);
        }
    })
    const middlePages = validUpdates.map(update => parseInt(findMiddleElement(update)));
    

    return sum(middlePages);
}

const isValidUpdate = (update, rules) => {
    if (update.length == 1) {
        return true;
    };

    const currentPage = update[0];
    const followingPages = update.slice(1);

    if(
        !rules[currentPage] || followingPages.every(page => !rules[currentPage].includes(page))
    ) {
        return isValidUpdate(followingPages, rules);
    } else {
        return false;
    }
}



console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    const [rules, updatePages] = parseInput(input);
    const invalidUpdates = [];
    
    updatePages.forEach(update => {
        if(!isValidUpdate(update, rules)) {
            invalidUpdates.push(update);
        }
    })

    let fixedUpdates = invalidUpdates.map(update => fixInvalidUpdate(update, rules));
    let allFixed = fixedUpdates.every(update => isValidUpdate(update, rules));
    
    while (!allFixed) {
        fixedUpdates = fixedUpdates.map(update => fixInvalidUpdate(update, rules));
        allFixed = fixedUpdates.every(update => isValidUpdate(update, rules));
    }

    const middlePages = fixedUpdates.map(update => parseInt(findMiddleElement(update)));
    
    return sum(middlePages);
}

const fixInvalidUpdate = (update, rules) => {    
    if(isValidUpdate(update, rules)) {
        return update;
    }

    const currentPage = update[0];
    
    const invalidIndex = update.findIndex(page => rules[currentPage] && rules[currentPage].includes(page));

    if(update[invalidIndex]) {
        const newUpdate = [update[invalidIndex], ...update.slice(0, invalidIndex), ...update.slice(invalidIndex + 1)];
        
        if(isValidUpdate(newUpdate, rules)) {
            return newUpdate
        } else {
            return [newUpdate[0], ...fixInvalidUpdate(newUpdate.slice(1), rules)]
        }
    } else {  
        return [currentPage, ...fixInvalidUpdate(update.slice(1), rules)]
    }


}

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
