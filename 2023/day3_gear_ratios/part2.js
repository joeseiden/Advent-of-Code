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

const calculateGearRatioSum = (schematic) => {
    const gearRe = /\*/g;
    const numRe = /\d+/g;
    const sameLineAdjacentRe = /\d+(?=\*)|(?<=\*)\d+/g;

    let gearRatioSum = 0;

    schematic.forEach((row, i) => {
        const gears = [...row.matchAll(gearRe)];

        gears.forEach((gear) => {
            const gearIndex = gear.index;

            const rowAbove = i > 0 ? schematic[i - 1] : null;
            const rowBelow = i < schematic.length - 1 ? schematic[i + 1] : null;
            const adjacentNumbers = [];
            //Find adjacencies above or below
            if(rowAbove || rowBelow) {
                const matchedNums = [];
                if(rowAbove) {
                    matchedNums.push(...Array.from(rowAbove.matchAll(numRe)));
                }

                if(rowBelow) {
                    matchedNums.push(...Array.from(rowBelow.matchAll(numRe)));
                }
                matchedNums.forEach((num) => {
                    if(isNumAdjacentToGear(num, gearIndex)) {
                        adjacentNumbers.push(parseInt(num[0]))
                    }
                })
            }
            //Find adjacencies on the same line
            const sameLineMatchedNums = [...row.matchAll(sameLineAdjacentRe)];

            sameLineMatchedNums.forEach((num) => {
                if(num.index === gearIndex + 1 || num.index + num[0].length === gearIndex) {
                    adjacentNumbers.push(parseInt(num[0]));
                } 
            });

            //Multiply adjacent numbers together and add to the total if we have the right number
            if(adjacentNumbers.length === 2) {
                gearRatioSum += (adjacentNumbers[0] * adjacentNumbers[1]);
            }            
        })
    })

    return gearRatioSum;
}

const isNumAdjacentToGear = (numMatch, gearIndex) => {
    const numIndices = [...Array(numMatch[0].length).keys()].map(x => x + numMatch.index);

    for(i = -1; i < 2; i++) {
        if(numIndices.includes(gearIndex + i)) {
            return true;
        };
    }

    return false;
}

console.log(calculateGearRatioSum(exampleInput));
console.log(calculateGearRatioSum(inputArray));
