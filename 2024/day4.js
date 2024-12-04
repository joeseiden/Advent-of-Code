import { readFileSync } from "fs";
import _ from 'lodash';

const exampleInput = readFileSync('./inputs/day4_example.txt', 'utf8');
const input = readFileSync('./inputs/day4.txt', 'utf8');

const parseInput = (input) => {
    return input.split('\n').map(line => line.split(''));
}

const isValidXmas = (string) => {
    return string === 'XMAS' || string === 'SAMX';
}


const part1 = (input) => {
    let xmasCount = 0;
    const wordSearch = parseInput(input)
   
    for (let i = 0; i < wordSearch.length; i++) {
        for (let j = 0; j < wordSearch[i].length; j++) {
            if(wordSearch[i][j] === 'X' || wordSearch[i][j] === 'S') {
                // Horizontal-right
                if(
                    j + 3 < wordSearch[i].length && 
                    isValidXmas(wordSearch[i].slice(j, j + 4).join(''))
                ) {
                    xmasCount++;
                }
                
                // Vertical-down
                if(
                    i + 3 < wordSearch.length && 
                    isValidXmas(
                        wordSearch[i][j] + 
                        wordSearch[i + 1][j] + 
                        wordSearch[i + 2][j] + 
                        wordSearch[i + 3][j]
                    )
                ) {
                    xmasCount++;
                }
                
                // Diagonal-down-right
                if(
                    j + 3 < wordSearch[i].length &&
                    i + 3 < wordSearch.length &&
                    isValidXmas(
                        wordSearch[i][j] +
                        wordSearch[i + 1][j + 1] +
                        wordSearch[i + 2][j + 2] +
                        wordSearch[i + 3][j + 3]
                    )
                ) {
                    xmasCount++;
                }
                
                // Diagonal-down-left
                if(
                    j - 3 >= 0 &&
                    i + 3 < wordSearch.length &&
                    isValidXmas(
                        wordSearch[i][j] +
                        wordSearch[i + 1][j - 1] +
                        wordSearch[i + 2][j - 2] +
                        wordSearch[i + 3][j - 3]
                    )
                ) {
                    xmasCount++;
                }
            }
        }
        
    }
    
    return xmasCount;
}


console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    const wordSearch = parseInput(input);
    let masCount = 0;

    for (let i = 1; i < wordSearch.length - 1; i++) {
        for (let j = 1; j < wordSearch[i].length - 1; j++) {
            if(wordSearch[i][j] === 'A') {
                if(
                    wordSearch[i - 1][j - 1] === 'M' && 
                    wordSearch[i - 1][j + 1] === 'M' &&
                    wordSearch[i + 1][j - 1] === 'S' &&
                    wordSearch[i + 1][j + 1] === 'S'
                ) {
                    masCount++;
                }

                if(
                    wordSearch[i - 1][j + 1] === 'M' && 
                    wordSearch[i + 1][j + 1] === 'M' &&
                    wordSearch[i - 1][j - 1] === 'S' &&
                    wordSearch[i + 1][j - 1] === 'S'
                ) {
                    masCount++;
                }

                if(
                    wordSearch[i + 1][j - 1] === 'M' && 
                    wordSearch[i + 1][j + 1] === 'M' &&
                    wordSearch[i - 1][j - 1] === 'S' &&
                    wordSearch[i - 1][j + 1] === 'S'
                ) {
                    masCount++;
                }

                if(
                    wordSearch[i - 1][j - 1] === 'M' && 
                    wordSearch[i + 1][j - 1] === 'M' &&
                    wordSearch[i - 1][j + 1] === 'S' &&
                    wordSearch[i + 1][j + 1] === 'S'
                ) {
                    masCount++;
                }
            }

        }
        
    }

    return masCount;
}

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
