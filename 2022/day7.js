import { readFileSync } from "fs";
import _ from 'lodash';

const exampleCommands = readFileSync('./inputs/day7_example.txt', 'utf8').split('\n');
const commands = readFileSync('./inputs/day7.txt', 'utf8').split('\n');

const parseFileTree = (commands) => {
    let fileTree = {};
    let currentPath = [];

    const getDir = () => {
        let dir = fileTree;
        currentPath.forEach((segment) => {
            dir = dir[segment]
        })
        return dir;
    }

    let currentDir = getDir();

    commands.forEach((command) => {
        const commandArr = command.split(' ')
        
        if(commandArr[0] == '$') {
            if(commandArr[1] == 'cd') {
                if(commandArr[2] == '/') {
                    currentPath = ['/']
                    fileTree['/'] = {};
                } else if (commandArr[2] == '..') {
                    currentPath.pop();
                } else {
                    currentPath.push(commandArr[2]);
                }
                currentDir = getDir();
            }
        } else if (commandArr[0] == 'dir') {
            const dirName = commandArr[1]
            currentDir[dirName] = {};
        } else if (parseInt(commandArr[0])) {
            const [size, fileName] = commandArr;
            currentDir[fileName] = parseInt(size);
        }
    })
    return fileTree;
}

const part1 = (input) => {
    const fileTree = parseFileTree(input);
    const dirSizeCeiling = 100000;
    const dirSizes = [];

    const calculateDirSizes = (fileTree) => {
        let sum = 0;

        Object.values(fileTree).forEach((node) => {
            if(typeof node == 'number') {
                sum += node;
            } else {
                const partialSum = calculateDirSizes(node);
                dirSizes.push(partialSum);
                sum += partialSum;
            }
        })
        return sum;
    };

    calculateDirSizes(fileTree);
    
    return dirSizes.reduce(( a, b ) => {
        if(b <= dirSizeCeiling ) {
            return a + b;
        }
        return a;
    }, 0);
};


console.log(`Part 1 example solution: ${part1(exampleCommands)}`);
console.log(`Part 1 solution: ${part1(commands)}`);

const part2 = (input) => {
    const fileTree = parseFileTree(input);
    const dirSizes = [];
    const totalSpace = 70_000_000;
    const spaceNeeded = 30_000_000;

    const calculateDirSizes = (fileTree) => {
        let sum = 0;

        Object.values(fileTree).forEach((node) => {
            if(typeof node == 'number') {
                sum += node;
            } else {
                const partialSum = calculateDirSizes(node);
                dirSizes.push(partialSum);
                sum += partialSum;
            }
        })
        return sum;
    };
    calculateDirSizes(fileTree);
    
    const spaceInUse = dirSizes.at(-1); //the outermost directory
    const currentUnusedSpace = totalSpace - spaceInUse;
    const minSpaceRequired = spaceNeeded - currentUnusedSpace;
    
    return Math.min(...dirSizes.filter(size => size >= minSpaceRequired));
}

console.log(`Part 2 example solution: ${part2(exampleCommands)}`);
console.log(`Part 2 solution: ${part2(commands)}`);