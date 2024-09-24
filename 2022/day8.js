import { readFileSync } from 'fs';

const input = readFileSync('./inputs/day8.txt', 'utf8').split('\n').map(row => row.split('').map(num => parseInt(num)));
const exampleInput = readFileSync('./inputs/day8_example.txt', 'utf8').split('\n').map(row => row.split('').map(num => parseInt(num)));

const zip = (arr, ...args) => {
    return arr.map((val, i) => [val, ...args.map(arr => arr[i])])
}

const isVisible = (i, row) => {
    const tree = row[i];
    const tallestTreeLeft = Math.max(...row.slice(0,i));
    const tallestTreeRight = Math.max(...row.slice(i + 1));
    return tree > tallestTreeLeft || tree > tallestTreeRight;
}

const part1 = (input) => {
    const zippedInput = zip(...input);
    let visibleTreeCount = 0;
    
    for(let i = 0; i < input.length; i++) {
        for(let j = 0; j < zippedInput.length; j++) {
            if(isVisible(j, input[i]) || isVisible(i, zippedInput[j])) {
                visibleTreeCount++;
            }
        }
    }
    return visibleTreeCount;
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const calculateScenicScoreByRow = (i, row) => {
    const tree = row[i];
    const treesLookingLeft = row.slice(0, i).reverse(); //reversed so that we can traverse the trees left to right as we move away from our tree
    const treesLookingRight = row.slice(i + 1);

    const findVisibleTreeCount = (height, trees) => {
        return trees.findIndex(tree => tree >= height) + 1 || trees.length;
    };
    
    return findVisibleTreeCount(tree, treesLookingLeft) * findVisibleTreeCount(tree, treesLookingRight);
}

const part2 = (input) => {
    const zippedInput = zip(...input);
    let maxScenicScore = -Infinity;

    for(let i = 0; i < input.length; i++) {
        for(let j = 0; j < zippedInput.length; j++) {
            maxScenicScore = Math.max(
                calculateScenicScoreByRow(j, input[i]) * calculateScenicScoreByRow(i, zippedInput[j]),
                maxScenicScore
            )
        }
    }
    return maxScenicScore;
}


console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
