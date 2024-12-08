import { lookupService } from "dns";
import { readFileSync } from "fs";
import _ from 'lodash';
import { includesSubArray } from "../lib/index.js";

const exampleInput = readFileSync('./inputs/day6_example.txt', 'utf8');
const input = readFileSync('./inputs/day6.txt', 'utf8');

const parseInput = (input) => {
    let guard;
    const obstacles = [];

    const inputGrid = input.split('\n').map(line => line.split(''));

    for (let i = 0; i < inputGrid.length; i++) {
        for (let j = 0; j < inputGrid[i].length; j++) {
            const currentEl = inputGrid[i][j]
            if(currentEl == '#') {
                obstacles.push([i, j]);
            } else if (
                currentEl == '^' ||
                currentEl == '>' ||
                currentEl == 'v' ||
                currentEl == '<'
            ) {
                guard = {
                    loc: [i,j],
                    dir: currentEl
                }
            }
        }
        
    }

    return [guard, inputGrid.length, obstacles]
}

const calculateGuardPath = (guard, gridDim, obstacles) => {
    const visitedLocations = [];
    let guardInbounds = true;
    let {loc, dir} = guard;
    visitedLocations.push(loc)
    
    while(guardInbounds) {
        let nextLoc;

        switch (dir) {
            case '^':
                nextLoc = [loc[0] - 1, loc[1]];
                break;
            case '>':
                nextLoc = [loc[0], loc[1] + 1];
                break;
            case '<':
                nextLoc = [loc[0], loc[1] - 1];
                break;
            case 'v':
                nextLoc = [loc[0] + 1, loc[1]];
                break;
            default:
                break;
        }
        
        if(nextLoc[0] < 0 || nextLoc[0] >= gridDim || nextLoc[1] < 0 || nextLoc[1] >= gridDim) {
            guardInbounds = false;
        } else if (includesSubArray(obstacles, nextLoc)) {
            dir = turnNinety(dir);
        } else {
            if(!includesSubArray(visitedLocations, nextLoc)) {
                visitedLocations.push(nextLoc);
            }
            loc = nextLoc;
        }
    }
    return visitedLocations;
}

const part1 = (input) => {
    const [guard, gridDim, obstacles] = parseInput(input);
    
    return calculateGuardPath(guard, gridDim, obstacles).length
}

const turnNinety = (dir) => {
    const turns = {
        '^': '>',
        '>': 'v',
        'v': '<',
        '<': '^'
    }

    return turns[dir];
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    let loopCount = 0;
    const [guard, gridDim, obstacles] = parseInput(input);
    const originalGuardPath = calculateGuardPath(guard, gridDim, obstacles);
    const loopObstacles = []
    originalGuardPath.forEach((testLoc, i) => {
        console.log(`Testing ${i} of ${originalGuardPath.length}`);
        
        if(isLoop(guard, gridDim, [...obstacles, testLoc])) {
            loopObstacles.push(testLoc);
        }
    })
    
    return loopObstacles.length;
}

const isLoop = (guard, gridDim, obstacles) => {
    const visitedLocations = [guard];
    let guardInbounds = true;
    let guardInLoop = false;
    let {loc, dir} = guard;

    while(guardInbounds && !guardInLoop) {
        let nextLoc;

        switch (dir) {
            case '^':
                nextLoc = [loc[0] - 1, loc[1]];
                break;
            case '>':
                nextLoc = [loc[0], loc[1] + 1];
                break;
            case '<':
                nextLoc = [loc[0], loc[1] - 1];
                break;
            case 'v':
                nextLoc = [loc[0] + 1, loc[1]];
                break;
            default:
                break;
        }

        if(nextLoc[0] < 0 || nextLoc[0] >= gridDim || nextLoc[1] < 0 || nextLoc[1] >= gridDim) {
            guardInbounds = false;
        } 
        else if (!!visitedLocations.filter(visitedLoc => isVisitedLocationEqual(visitedLoc, {dir, loc: nextLoc})).length) {
            guardInLoop = true;
        }
         else if (includesSubArray(obstacles, nextLoc)) {
            dir = turnNinety(dir);
        } else {
            if(!includesSubArray(visitedLocations, nextLoc)) {
                visitedLocations.push({dir, loc: nextLoc});
            }
            loc = nextLoc;
        }
    }
    console.log(guardInLoop);
    
    return guardInLoop;
}

const isVisitedLocationEqual = (visitedLoc, newLoc) => visitedLoc.dir === newLoc.dir && _.isEqual(visitedLoc.loc, newLoc.loc)

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
