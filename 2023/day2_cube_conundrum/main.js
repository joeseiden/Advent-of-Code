const input = module.require('./input.js');

const inputArray = input.split('\n');

const calculatePossibleGames = (gamesArray) => {
    const [possibleRed, possibleGreen, possibleBlue] = [12, 13, 14];
    
    let possibleGamesSum = 0;
    
    const findMaxOfColor = (game, color) => {
        const re = new RegExp(`(\d+) ${color}`, 'g');
        const max = [...game.matchAll(re)]
                        .map(num => parseInt(num))
                        .reduce((a,b) => Math.max(a, b), -Infinity);
        return max;
    }

    findMaxOfColor('red');
    gamesArray.forEach((game, i) => {
        [maxRed, maxBlue, maxGreen] = ['red', 'blue', 'green'].map(color => findMaxOfColor(game, color));
 
        if(maxRed <= possibleRed && maxBlue <= possibleBlue && maxGreen <= possibleGreen
        ) {
            possibleGamesSum += (i + 1)
        }
    });
    
    return possibleGamesSum;
}

console.log(calculatePossibleGames(inputArray));
