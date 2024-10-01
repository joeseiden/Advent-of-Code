import { readFileSync } from "fs";
import { lcm } from "mathjs";

const exampleInput = readFileSync('./inputs/day11_example.txt', 'utf8').split('\n\n');
const input = readFileSync('./inputs/day11.txt', 'utf8').split('\n\n');

const operatorFunctions = {
    '*': (a, b) => a * b,
    '+': (a, b) => a + b
};

const parseInput = (input) => {
    const monkeys = [];
    input.forEach((chunk) => {
        const monkey = chunk.split('\n');
        const startingItems = monkey[1].split(':')[1].split(',').map(num => parseInt(num));
        const operation = monkey[2].split(' ');
        const operator = operation.at(-2);
        const operand = parseInt(operation.at(-1)) || operation.at(-1);
        const divisor = parseInt(monkey[3].split(' ').at(-1));
        const trueTarget = parseInt(monkey[4].split(' ').at(-1));
        const falseTarget = parseInt(monkey[5].split(' ').at(-1));
        
        monkeys.push({
            startingItems,
            operator,
            operand,
            divisor,
            trueTarget,
            falseTarget
        })
    })
    return monkeys;
}

const part1 = (input) => {
    const monkeys = parseInput(input);
    const monkeyInspectionCounts = new Array(monkeys.length).fill(0);

    for(let i = 0; i < 20; i++) {
        monkeys.forEach((monkey, i) => {
            monkeyInspectionCounts[i] += monkey.startingItems.length;
            monkey.startingItems.forEach((item) => {
                //perform monkey inspection operation, then divide by 3 and floor
                const newItem = Math.floor(operatorFunctions[monkey.operator](
                    item, 
                    monkey.operand === 'old' ? item : monkey.operand
                ) / 3);
                
                //check divisibility test, then send item to new monkey depending on result
                if(newItem % monkey.divisor === 0) {
                    monkeys[monkey.trueTarget].startingItems.push(newItem);
                } else {
                    monkeys[monkey.falseTarget].startingItems.push(newItem);
                }
            })
            //monkey has now inspected and thrown all its items
            monkey.startingItems = [];
        })
    }
    monkeyInspectionCounts.sort((a,b) => b - a);
    return monkeyInspectionCounts[0] * monkeyInspectionCounts[1];
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    const monkeys = parseInput(input);
    const monkeyInspectionCounts = new Array(monkeys.length).fill(0);
    const rounds = 10_000
    const worryController = lcm(...monkeys.map(monkey => monkey.divisor));

    for(let i = 0; i < rounds; i++) {
        monkeys.forEach((monkey, i) => {
            monkeyInspectionCounts[i] += monkey.startingItems.length;
            monkey.startingItems.forEach((item) => {
                //perform monkey inspection operation
                const newItem = Math.floor(operatorFunctions[monkey.operator](
                    item, 
                    monkey.operand === 'old' ? item : monkey.operand
                ) % worryController);
                
                //check divisibility test, then send item to new monkey depending on result
                if(newItem % monkey.divisor === 0) {
                    monkeys[monkey.trueTarget].startingItems.push(newItem);
                } else {
                    monkeys[monkey.falseTarget].startingItems.push(newItem);
                }
            })
            //monkey has now inspected and thrown all its items
            monkey.startingItems = [];
        })
    }
    monkeyInspectionCounts.sort((a,b) => b - a);
    return monkeyInspectionCounts[0] * monkeyInspectionCounts[1];
}

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);