import { readFileSync } from "fs";

const exampleInput = readFileSync('./inputs/day9_example.txt', 'utf8');
const input = readFileSync('./inputs/day9.txt', 'utf8');

const parseInput = (input) => {
    return input.split('').map(Number);
}

const part1 = (input) => {
    const parsedInput = parseInput(input);
    const unpackedDisk = []
    
    for (let i = 0; i < parsedInput.length; i++) {
        for (let j = parsedInput[i]; j > 0; j--) {
            if(i % 2 === 0 && input.at(i) !== '0') {
                unpackedDisk.push(i / 2);
            } else {
                unpackedDisk.push('.')
            }   
        }
    }

    for (let i = 0; i < unpackedDisk.length; i++) {
        if(unpackedDisk[i] === '.') {
            let lastValue;
            do {
                lastValue = unpackedDisk.pop();
                if(lastValue !== '.') {
                    unpackedDisk[i] = lastValue;
                }
            } while (lastValue === '.');
        }
    }
    
    let checksum = 0;
    for (let i = 0; i < unpackedDisk.length; i++) {
        checksum += unpackedDisk[i] * i;
    }

    return checksum;
}


console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    const parsedInput = parseInput(input);
    const unpackedDisk = []
    for (let i = 0; i < parsedInput.length; i++) {
        if(input.at(i) !== '0') {
            if(i % 2 === 0) {
                unpackedDisk.push(
                    {
                        id: i / 2,
                        type: 'file',
                        size: parsedInput[i]
                    }
                )
                
            } else {
                unpackedDisk.push(
                    {
                        type: '.',
                        size: parsedInput[i]
                    }
                )
            }   
        }
    }

    for(let i = unpackedDisk.length - 1; i >= 0; i--) {
        const current = unpackedDisk[i]
        if(current.type === 'file' ) {
            for (let j = 0; j < i; j++) {
                if(unpackedDisk[j].type === '.' && unpackedDisk[j].size >= current.size) {
                    const remainder = unpackedDisk[j].size - current.size;

                    unpackedDisk[j] = current;
                    unpackedDisk[i] = {
                        type: '.',
                        size: current.size
                    }

                    if(remainder > 0) {
                        unpackedDisk.splice(j + 1, 0, { type: '.', size: remainder});
                        i++;
                    }
                    break;
                }
                
            }
        }
    }
    

    let i = 0;
    let checksum = 0;
    unpackedDisk.forEach(block => {
        if(block.type === 'file') {
            for (let j = 0; j < block.size; j++) {
                checksum += block.id * (i + j);
            }
            i += block.size
        } else {
            i += block.size;
        }
    })

    return checksum;
}

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
