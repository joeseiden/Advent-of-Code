const largeInput = require('./input.js');

const exampleInput2 = 'two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen';

const regex = /\d|one|two|three|four|five|six|seven|eight|nine/;
const reverseRegex = /\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/;

const SPELLED_NUMBERS = {
    'one': '1',
    'two': '2',
    'three': '3', 
    'four': '4', 
    'five': '5', 
    'six': '6', 
    'seven': '7', 
    'eight': '8', 
    'nine': '9'
};


const findCalibrationValue = (inputString) => {
    const parsedInput = inputString.split('\n');
    
    const numbers = parsedInput.map((string) => {
        let numberString = '';
        
        const firstDigit = string.match(regex)[0];
        const secondDigit = string.split('').reverse().join('').match(reverseRegex)[0];
        numberString += firstDigit.length > 1 ? SPELLED_NUMBERS[firstDigit] : firstDigit;
        numberString += secondDigit.length > 1 ? SPELLED_NUMBERS[secondDigit.split('').reverse().join('')] : secondDigit;
        
        return parseInt(numberString);
    })
    
    const numOr0 = n => isNaN(n) ? 0 : n;
    
    const sum = numbers.reduce((partialSum, num) => numOr0(partialSum) + numOr0(num), 0);

    return sum
}

console.log(findCalibrationValue(exampleInput2));
console.log(findCalibrationValue(largeInput));
