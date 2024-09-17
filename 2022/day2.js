import { readFileSync } from 'fs';
import { Enumify } from 'enumify';
import { log } from 'console';

const input = readFileSync('./inputs/day2.txt', 'utf8').split('\n');
const exampleInput = readFileSync('./inputs/day2_example.txt', 'utf8').split('\n');


// Part 1
class Shape extends Enumify {
    static rock = new Shape(1);
    static paper = new Shape(2);
    static scissors = new Shape(3);
    static _ = this.closeEnum();

    constructor(value) {
        super();
        this.value = value;
    }
}

const shapeFromLetter = (letter) => {
    if (['A', 'X'].includes(letter)) {
        return Shape.rock;
    };
    if (['B', 'Y'].includes(letter)) {
        return Shape.paper;
    }
    if (['C', 'Z'].includes(letter)) {
        return Shape.scissors;
    }
}

const part1 = (input) => {
    let pointsSum = 0;
    
    input.forEach((game) => {
        const [opponent, player] = game.split(' ').map(letter => shapeFromLetter(letter));
        pointsSum += calculateGameScore(opponent, player);
    })
    return pointsSum
}

const calculateGameScore = (opponent, player) => {
  if(
    player == opponent
  ) {
    return 3 + player.value;
  } else if(
    (player == Shape.rock && opponent == Shape.scissors) ||
    (player == Shape.paper && opponent == Shape.rock) ||
    (player == Shape.scissors && opponent == Shape.paper)
  )  {
    return 6 + player.value;
  } else {
      return player.value;
  }
};

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

//Part 2
class Guide extends Enumify {
    static win = new Guide();
    static tie = new Guide();
    static lose = new Guide();
    static _ = this.closeEnum();

    constructor() {
        super();
    }
}

const guideFromLetter = (letter) => {
    if(letter == 'X') {
        return Guide.lose;
    }
    if(letter == 'Y') {
        return Guide.tie;
    }
    if(letter == 'Z') {
        return Guide.win;
    }
 }

const shapeToPick = {
    [Shape.rock]: {
        [Guide.lose]: Shape.scissors,
        [Guide.win]: Shape.paper
    },
    [Shape.paper]: {
        [Guide.lose]: Shape.rock,
        [Guide.win]: Shape.scissors
    },
    [Shape.scissors]: {
        [Guide.lose]: Shape.paper,
        [Guide.win]: Shape.rock
    }
}

const part2 = (input) => {
    let pointsSum = 0;

    input.forEach((game) => {
        const [opponent, guide] = game.split(' ').map((letter) => {
            if('ABC'.includes(letter)) {
                return shapeFromLetter(letter);
            } else if ('XYZ'.includes(letter)) {
                return guideFromLetter(letter);
            }
        });
        pointsSum += followGuide(opponent, guide);
    })
    return pointsSum;
};

const followGuide = (opponent, guide) => {
    if(guide == Guide.tie) {
        return calculateGameScore(opponent, opponent);
    }

    return calculateGameScore(opponent, shapeToPick[opponent][guide])
};

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
