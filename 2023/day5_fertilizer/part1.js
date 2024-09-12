import { readFileSync } from 'fs';
import { skip } from 'node:test';

const largeInput = readFileSync('./input.txt', 'utf8');
const exampleInput = readFileSync('./example.txt', 'utf8');

const calculateLowestLocationValue = (input) => {
    const inputArray = input.split('\n\n');
    
    const parseRange = (row) => {
        const [destStart, sourceStart, range] = row.split(' ').map(num => parseInt(num));
        
        return {
            rangeStart: sourceStart, 
            rangeEnd: sourceStart + range - 1, 
            offset: destStart - sourceStart
        }
    };

    const parseMapBlock = (mapBlock) => {    
        return mapBlock.split('\n').slice(1).map(row => parseRange(row)).sort((a, b) => a.sourceStart - b.sourceStart);
    }

    const seeds = [...inputArray[0].matchAll(/\d+/g)].map(num => parseInt(num[0]));
    const mapBlocks = inputArray.slice(1).map(block => parseMapBlock(block));

    const results = [];
    seeds.forEach((seed) => {
        mapBlocks.forEach((transformations) => {
            transformations.some(({rangeStart, rangeEnd, offset}) => {
                if(seed >= rangeStart && seed <= rangeEnd) {
                    seed = seed + offset;
                    return true;
                }
            })
        })
        
        results.push(seed);
    })
    
    
    return Math.min(...results);
}

console.log(calculateLowestLocationValue(largeInput));
console.log(calculateLowestLocationValue(exampleInput));





