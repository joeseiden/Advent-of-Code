const input = module.require('./input.js');

const inputArray = input.split('\n');

const calculatePossibleGames = (gamesArray) => {
    const maxPossibleCubes = {
        red: 12,
        green: 13,
        blue: 14
    };
    
    let possibleGamesSum = 0;
    
    const redRegex = /(\d+) red/g;
    const blueRegex = /(\d+) blue/g;
    const greenRegex = /(\d+) green/g;
    
    gamesArray.forEach((game, i) => {
        const maxRed = [...game.matchAll(redRegex)].map(el => parseInt(el)).reduce((a, b) => Math.max(a,b), -Infinity);
        const maxBlue = [...game.matchAll(blueRegex)].map(el => parseInt(el)).reduce((a, b) => Math.max(a,b), -Infinity);
        const maxGreen = [...game.matchAll(greenRegex)].map(el => parseInt(el)).reduce((a, b) => Math.max(a,b), -Infinity);
        console.log(maxRed, maxBlue, maxGreen);
        
        if(maxRed <= maxPossibleCubes.red && maxBlue <= maxPossibleCubes.blue && maxGreen <= maxPossibleCubes.green
        ) {
            possibleGamesSum += (i + 1)
        }
    });
    
    return possibleGamesSum;
}

console.log(calculatePossibleGames(inputArray));
