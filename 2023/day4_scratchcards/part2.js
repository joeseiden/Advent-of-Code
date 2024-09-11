import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', 'utf8');
const inputArray = input.split('\n');

const calculateScratchcardTotal = (scratchcards) => {
    const scratchcardCount = new Array(scratchcards.length).fill(1);

    const extractNumsToSet = (numString) => {
        return new Set([...numString.matchAll(/\d{1,2}/g)].map(num => num[0]));
    }

    scratchcards.forEach((card, currentIndex) => {
        const splitCard = card.slice(card.indexOf(':') + 1).split('|');
        const [winningNums, numsWeHave] = splitCard.map(numString => extractNumsToSet(numString)); 
        const matchCount = numsWeHave.intersection(winningNums).size
        
        for(let i = currentIndex + 1; i <= currentIndex + matchCount; i++) {
            scratchcardCount[i] += scratchcardCount[currentIndex];
        }
    })
    
    return scratchcardCount.reduce((a,b) => a + b);
};

console.log(calculateScratchcardTotal(inputArray));
