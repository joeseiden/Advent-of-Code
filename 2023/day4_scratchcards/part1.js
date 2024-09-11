import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', 'utf8');
const inputArray = input.split('\n');

const calculateScratchcardTotal = (scratchcards) => {
    let scratchCardSum = 0;

    const extractNumsToSet = (numString) => {
        return new Set([...numString.matchAll(/\d{1,2}/g)].map(num => num[0]));
    }

    scratchcards.forEach((card) => {
        const splitCard = card.slice(card.indexOf(':') + 1).split('|');
        const [winningNums, numsWeHave] = splitCard.map(numString => extractNumsToSet(numString)); 
        const matchCount = numsWeHave.intersection(winningNums).size
        scratchCardSum += matchCount > 0 ? 2**(matchCount - 1) : 0;  
    })
    return scratchCardSum;
};

console.log(calculateScratchcardTotal(inputArray));
