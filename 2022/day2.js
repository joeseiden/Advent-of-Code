import { readFileSync } from 'fs';

const input = readFileSync('./inputs/day2.txt', 'utf8').split('\n');
const exampleInput = readFileSync('./inputs/day2_example.txt', 'utf8').split('\n');

// A, X = Rock
// B, Y = Paper
// C, Z = Scissors

const winCombos = {
    'A': 'Y',
    'B': 'Z',
    'C': 'X'
};

const tieCombos = {
    'A': 'X',
    'B': 'Y',
    'C': 'Z'
};

const shapePoints = {
    'X': 1,
    'Y': 2,
    'Z': 3
};

const part1 = (input) => {
    let pointsSum = 0;
    
    input.forEach((game) => {
        const [opponent, player] = game.split(' ');
        
        pointsSum += calculateGameScore(opponent, player);
    })
    return pointsSum
}

const calculateGameScore = (opponent, player) => {
    if(winCombos[opponent] == player) {
        return 6 + shapePoints[player]
    } else if (tieCombos[opponent] == player) {
        return 3 + shapePoints[player]
    } else {
        return 0 + shapePoints[player]
    }
};

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

// X = lose, Y = tie, Z = win
// A > C > B > A

const guideTable = {
    'A': {
        win: 'B',
        lose: 'C'
    },
    'B': {
        win: 'C',
        lose: 'A'
    },
    'C': {
        win: 'A',
        lose: 'B'
    }
}

const shapePoints2 = {
    'A': 1,
    'B': 2,
    'C': 3
}

const part2 = (input) => {
    let pointsSum = 0;

    input.forEach((game) => {
        const [opponent, guide] = game.split(' ');

        pointsSum += followGuide(opponent, guide);
    })
    return pointsSum;
};

const followGuide = (opponent, guide) => {
    if(guide == 'Z') {
        return 6 + shapePoints2[guideTable[opponent].win];
    } else if (guide == 'Y') {
        return 3 + shapePoints2[opponent];
    } else if (guide == 'X') {
        return shapePoints2[guideTable[opponent].lose]
    }
};

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
