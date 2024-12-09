import { readFileSync } from "fs";
import { isBetween, isArraysEqual } from "../lib/index.js";
import _ from 'lodash';


const exampleInput = readFileSync('./inputs/day8_example.txt', 'utf8');
const input = readFileSync('./inputs/day8.txt', 'utf8');

const parseInput = (input) => {
    const antennas = {}
    const grid = input.split('\n').map(line => line.split(''));

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const el = grid[i][j];
            if (el !== '.') {
                if(antennas[el]) {
                    antennas[el].push([i,j]);
                } else {
                    antennas[el] = [[i, j]]
                }
            }
        }
        
    }

    return [antennas, grid.length]
}

const isInbounds = (coord, gridDim) => {
    return coord.every(el => isBetween(el, -1, gridDim));
}

const findPart1Antinodes = (antennaCoords, gridDim) => {
    const antinodes = [];

    for (let i = 0; i < antennaCoords.length; i++) {
        for (let j = i + 1; j < antennaCoords.length; j++) {
            const ant1 = antennaCoords[i];
            const ant2 = antennaCoords[j];
            const offset = [ant2[0] - ant1[0], ant2[1] - ant1[1]];
            const antinode1 = [ant1[0] - offset[0], ant1[1] - offset[1]];
            const antinode2 = [ant2[0] + offset[0], ant2[1] + offset[1]];

            [antinode1, antinode2].forEach(antinode => {
                if(isInbounds(antinode, gridDim)) {
                    antinodes.push(antinode)
                }
            })            
        }     
    }
    return antinodes;
}

const part1 = (input) => {
    const [antennas, gridDim] = parseInput(input);
    const allAntinodes = []
    
    Object.keys(antennas).forEach(antenna => {
        const antinodes = findPart1Antinodes(antennas[antenna], gridDim);
        allAntinodes.push(...antinodes)
    });
    const uniqueAntinodes = _.uniqWith(allAntinodes, isArraysEqual);
    
    return uniqueAntinodes.length;
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    const [antennas, gridDim] = parseInput(input);
    const allAntinodes = []
    
    Object.keys(antennas).forEach(antenna => {
        const antinodes = findPart2Antinodes(antennas[antenna], gridDim);
        allAntinodes.push(...antinodes)
    });
    const uniqueAntinodes = _.uniqWith(allAntinodes, isArraysEqual);
    
    return uniqueAntinodes.length;
}

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
// console.log(`Part 2 solution: ${part2(input)}`);
