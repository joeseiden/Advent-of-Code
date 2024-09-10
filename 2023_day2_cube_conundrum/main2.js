const input = module.require('./input.js');

const inputArray = input.split('\n');

const calculateTotalGamesPower = (gamesArray) => {    
    let totalGamePowerSum = 0;
    
    const redRegex = /(\d+) red/g;
    const blueRegex = /(\d+) blue/g;
    const greenRegex = /(\d+) green/g;
    
    gamesArray.forEach((game) => {
        const maxRed = [...game.matchAll(redRegex)].map(el => parseInt(el)).reduce((a, b) => Math.max(a,b), -Infinity);
        const maxBlue = [...game.matchAll(blueRegex)].map(el => parseInt(el)).reduce((a, b) => Math.max(a,b), -Infinity);
        const maxGreen = [...game.matchAll(greenRegex)].map(el => parseInt(el)).reduce((a, b) => Math.max(a,b), -Infinity);

        const power = maxRed * maxBlue * maxGreen;

        totalGamePowerSum += power;
    });
    
    return totalGamePowerSum;
}

console.log(calculateTotalGamesPower(inputArray));
