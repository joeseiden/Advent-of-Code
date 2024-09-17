const largeInput = require('./input.js');

const NUMBERS = '1234567890';

const calculateCalibrationValue = (input) => {
    const parsedInput = input.split('\n');
    const numbers = parsedInput.map((string) => {
        let numberString = '';
        for(i = 0; i < string.length; i++) {
            if(NUMBERS.includes(string[i])) {
                numberString += string[i];
            } 
        }        
        return parseInt(numberString[0] + numberString[numberString.length-1]); 
    });
    
    const numOr0 = n => isNaN(n) ? 0 : n;
    
    const sum = numbers.reduce((partialSum, num) => numOr0(partialSum) + numOr0(num), 0);

    return sum
}

const exampleInput = '1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet';

console.log(calculateCalibrationValue(exampleInput));
console.log(calculateCalibrationValue(largeInput));
