import _ from 'lodash';
import { readFileSync } from 'fs';

const exampleInput = readFileSync('inputs/day4_example.txt', 'utf8').split('\n');
const input = readFileSync('inputs/day4.txt', 'utf8').split('\n');

const part1 = (rangePairsArr) => {
    let count = 0;
    rangePairsArr.forEach((rangePair) => {
        const [leftRange, rightRange] = rangePair.split(',').map(range => range.split('-').map(num => parseInt(num)));

        if(isFullyContained(leftRange, rightRange)) {
            count++;
        };
    })
    return count;
}

const isFullyContained = (leftRange, rightRange) => {
    if(
        (leftRange[0] >= rightRange[0] && leftRange[1] <= rightRange[1]) ||
        (rightRange[0] >= leftRange[0] && rightRange[1] <= leftRange[1])
    ) {
        return true;
    }
    return false;
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const range = (start, stop, step=1) => {
    return Array.from(
        {
            length: (stop - start) / step + 1
        }, (value, index) => start + index * step
    );
}

const isOverlap = (leftRange, rightRange) => {
    return !!_.intersection(range(...leftRange), range(...rightRange)).length
}

const part2 = (rangePairsArr) => {
    let count = 0;
    rangePairsArr.forEach((rangePair) => {
        const [leftRange, rightRange] = rangePair.split(',').map(range => range.split('-').map(num => parseInt(num)));

        if(isOverlap(leftRange, rightRange)) {
            count++;
        };
    });
    return count;
};

console.log(`Part 2 example input solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);