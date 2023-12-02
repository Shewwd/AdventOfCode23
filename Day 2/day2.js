const fs = require('node:fs');

let data;
try {
  data = fs.readFileSync('input.txt', 'utf8');
} catch (err) {

}

const test_input = data.split('\r\n');

// const test_input = ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
//     'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
//     'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
//     'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
//     'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green' ]

const redAmount = 12;
const Red = 'red';
const greenAmount = 13;
const Green = 'green';
const blueAmount = 14;
const Blue = 'blue';

const removeGameFromString = (gameString) => {
    //skip to first number
    let i = 0;
    do 
        i++
    while (gameString[i] != ':');
    i += 2;

    return gameString.slice(i);
}

let possibleGamesIDSum = 0;
let gameSetPowerSum = 0;

test_input.forEach((game, index) => {
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;

    let possible = true;

    let gameStr = removeGameFromString(game);

    while (gameStr.length !== 0) {
        const firstComma = gameStr.indexOf(',');
        const firstSemiColon = gameStr.indexOf(';');

        let indexOfClosestTerminator;
        if(firstComma === -1 && firstSemiColon === -1)
            indexOfClosestTerminator = gameStr.length;
        else if(firstComma === -1 && firstSemiColon !== -1)
            indexOfClosestTerminator = firstSemiColon;
        else if(firstComma !== -1 && firstSemiColon === -1)
            indexOfClosestTerminator = firstComma;
        else
            indexOfClosestTerminator = firstComma < firstSemiColon ? firstComma : firstSemiColon;

        const numSubStr = gameStr.slice(0, indexOfClosestTerminator);

        let numStr = "";
        let j = 0;
        do {
            numStr += numSubStr[j];
            j++;
        } while(!Number.isNaN(parseInt(numSubStr[j])))
        j++;

        const num = parseInt(numStr);

        const colorStr = numSubStr.slice(j);

        switch(colorStr){
            case Red:
                if(num > maxRed)
                    maxRed = num;

                if(num > redAmount)
                    possible = false;
                break;
            case Green:
                if(num > maxGreen)
                    maxGreen = num;

                if(num > greenAmount)
                    possible = false;
                break;
            case Blue:
                if(num > maxBlue)
                    maxBlue = num;

                if(num > blueAmount)
                    possible = false;
                break;
        }
        
        gameStr = gameStr.slice(indexOfClosestTerminator + 2);
    }

    const setPower = (maxRed === 0 ? 1 : maxRed) * (maxGreen === 0 ? 1 : maxGreen) * (maxBlue === 0 ? 1 : maxBlue);

    gameSetPowerSum += setPower;

    if(possible)
        possibleGamesIDSum+=(index + 1);
});

console.log(possibleGamesIDSum);
console.log(gameSetPowerSum);