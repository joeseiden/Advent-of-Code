const input = require('./input.js');

const inputArray = input.split('\n');

exampleInput = [
    '467..114..',
    '...*......',
    '..35..633.',
    '......#...',
    '617*......',
    '.....+.58.',
    '..592.....',
    '......755.',
    '...$.*....',
    '.664.598..'
]


const calculateSumOfPartNumbers = (schematic) => {
    const numRe = /\d+/g;
    const symbolRe = /[^\d\w\.]/

    let partNumberSum = 0;
    
    schematic.forEach((row, i) => {
        const nums = [...row.matchAll(numRe)];

        nums.forEach((num) => {
            const matchIndex = num.index;
            const length = num[0].length;

            const rowStart = i > 0 ? i - 1 : i;
            const rowEnd = (i == schematic.length - 1 && i > 0) ? i : i + 1;
            const colStart = matchIndex > 0 ? matchIndex - 1 : matchIndex + length;
            const colEnd = matchIndex + length < row.length - 1 ? matchIndex + length : matchIndex + length - 1;
            
            for(j = rowStart; j <= rowEnd; j++) {                
                for(k = colStart; k <= colEnd; k++) {
                    if(schematic[j].at(k).match(symbolRe)) {
                        partNumberSum += parseInt(num[0]);
                        break;
                    }
                }
            }
        });
    });
    return partNumberSum;
};

console.log(calculateSumOfPartNumbers(exampleInput));
console.log(calculateSumOfPartNumbers(inputArray));
