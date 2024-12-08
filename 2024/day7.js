import { readFileSync } from "fs";
import { splitAndParseInt, sum, product } from "../lib/index.js";

const exampleInput = readFileSync('./inputs/day7_example.txt', 'utf8');
const input = readFileSync('./inputs/day7.txt', 'utf8');

const parseInput = (input) => {
    return input.split('\n').map(line => {
        const [testValue, equationValues] = line.split(": ");
        return [parseInt(testValue), splitAndParseInt(equationValues, ' ')]
    });
}

const part1 = (input) => {
    const calibrations = parseInput(input);

    let totalCalibrationResult = 0;
    calibrations.forEach(calibration => {
        const [testValue, nums] = calibration;
        if(
            sum(nums) === testValue ||
            product(nums) === testValue ||
            isEquationPossible(testValue, nums)
        ) { 
            totalCalibrationResult += testValue;
        }
    })
    
    return totalCalibrationResult;
}

const isEquationPossible = (testValue, nums, possibleOperators = ['+', '*']) => {
    const operatorSets = operatorPermutations(nums.length - 1, possibleOperators);
    const accumulator = nums[0];
    const vals = nums.slice(1);

    return operatorSets.some((operatorSet) => {
        let result = accumulator;
        operatorSet.forEach((operator, i) => {
            if(operator === '+') {
                result += vals[i]
            } else if(operator === '*') {
                result *= vals[i]
            } else if(operator === '||') {
                result = parseInt(result.toString() + vals[i].toString())
            }
        })
        return result === testValue;
    })
}

const operatorPermutations = (length, possibleOperators = ['+', '*']) => {
    const result = [];

    const permute = (currentArr) => {
        if(currentArr.length === length) {
            result.push([...currentArr])
            return;
        }

        possibleOperators.forEach(operator => {
            currentArr.push(operator);
            permute(currentArr);
            currentArr.pop();
        })
    }

    permute([]);
    return result;
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    const calibrations = parseInput(input);

    let totalCalibrationResult = 0;
    calibrations.forEach(calibration => {
        const [testValue, nums] = calibration;
        if(
            sum(nums) === testValue ||
            product(nums) === testValue ||
            isEquationPossible(testValue, nums, ['+', '*', '||'])
        ) { 
            totalCalibrationResult += testValue;
        }
    })
    
    return totalCalibrationResult;
}

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
