const input = module.require('./input.js');

const inputArray = input.split('\n');

const calculateTotalGamesPower = (gamesArray) => {    
    let totalGamePowerSum = 0;
    
    const findMaxOfColor = (game, color) => {
        const re = new RegExp(`(\\d+) ${color}`, 'g');
        const max = [...game.matchAll(re)]
                        .map(num => parseInt(num))
                        .reduce((a,b) => Math.max(a, b), -Infinity);
        return max;
    }

    gamesArray.forEach((game) => {
        const maxColorCounts = ['red', 'blue', 'green'].map(color => findMaxOfColor(game, color));
        const power = maxColorCounts.reduce((a,b) => a * b);

        totalGamePowerSum += power;
    });
    
    return totalGamePowerSum;
}

console.log(calculateTotalGamesPower(inputArray));
