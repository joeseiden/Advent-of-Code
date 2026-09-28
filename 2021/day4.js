import { readFileSync } from "fs";

const exampleInput = readFileSync('./inputs/day4_example.txt', 'utf8');
const input = readFileSync('./inputs/day4.txt', 'utf8');

const parseInput = (input) => {
    const splitInput = input.split('\n\n');
    const [numbers, cards] = [
        splitInput[0].split(',').map(num => parseInt(num)), 
        splitInput.slice(1).map(card => card.split('\n').map(line => line.split(' ').filter(el => el != '').map(num => parseInt(num))))
    ];
    return {numbers, cards};
}

const part1 = (input) => {
    // console.log(parseInput(input));
    const { numbers, cards } = parseInput(input);
    console.log(numbers);
    console.log(cards);
    
    return true;
}

const getDiagonalSequences = (card) => {
    const topLeftToBottomRight = [];
    const bottomLeftToTopRight = [];

    for (let i = 0; i < card.length; i++) {
        
        
    }
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
// console.log(`Part 1 solution: ${part1(input)}`);

// const part2 = (input) => {
//     return true;
// }

// console.log(`Part 2 example solution: ${part2(exampleInput)}`);
// console.log(`Part 2 solution: ${part2(input)}`);
