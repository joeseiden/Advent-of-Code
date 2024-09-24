import { readFileSync } from "fs";

const exampleInput = readFileSync('./inputs/day9_example.txt', 'utf8')
    .split('\n')
    .map(row => { 
        const arr = row.split(' ');
        return [arr[0], parseInt(arr[1])]
    });

const exampleInput2 = readFileSync

const input = readFileSync('./inputs/day9.txt', 'utf8')
    .split('\n')
    .map(
        row => { 
            const arr = row.split(' ');
            return [arr[0], parseInt(arr[1])]
    });

const part1 = (input) => {
    
    const visitedLocations = new Set();
    let head = [ 0, 0 ];
    let tail = [ 0, 0 ];

    input.forEach((instruction) => {
        const [newHead, newTail, newVisitedLocations] = moveHead(head, tail, instruction);
        head = newHead;
        tail = newTail;

        newVisitedLocations.map(JSON.stringify).forEach((location) => {
            visitedLocations.add(location);
        })        
    })
    return visitedLocations.size;
};

const moveHead = (head, tail, instruction) => {
    const visitedLocations = [];
    const [direction, distance] = instruction;
    let movesRemaining = distance;
    let newHead = head;
    let newTail = tail;
    while(movesRemaining > 0) {
        if(direction == 'R') {
            newHead = [newHead[0], newHead[1] + 1];
        }
        if(direction == 'L') {
            newHead = [newHead[0], newHead[1] - 1];
        }
        if(direction == 'U') {
            newHead = [newHead[0] - 1, newHead[1]];
        }
        if(direction == 'D') {
            newHead = [newHead[0] + 1, newHead[1]];
        }
        newTail = moveTail(newHead, newTail);
        
        visitedLocations.push(newTail);
        movesRemaining--;
    }
    
    return [newHead, newTail, visitedLocations]
}

const moveTail = (head, tail) => {
    if(isDiagonallyAdjacent(head, tail)) {
        return tail;
    } else if (Math.abs(head[0] - tail[0]) > 1 || Math.abs(head[1] - tail[1]) > 1) { //tail needs to move
            let row = tail[0];
            let column = tail[1];
            if(head[1] - tail[1] > 0) {
                column += 1;
            }
            if(head[1] - tail[1] < 0) {
                column -= 1;
            }
            if(head[0] - tail[0] > 0) {
                row += 1;
            }
            if(head[0] - tail[0] < 0) {
                row -= 1;
            }
            return [row, column]
    }
}

const isDiagonallyAdjacent = (a, b) => {
    return (a[0] == b[0] && Math.abs(a[1] - b[1]) <= 1) ||
           (a[1] == b[1] && Math.abs(a[0] - b[0]) <= 1) ||
           (Math.abs(a[0] - b[0]) <= 1 && Math.abs(a[1] - b[1]) <= 1)
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);




console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);