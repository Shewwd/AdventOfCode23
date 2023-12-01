const fs = require('node:fs');

let data;
try {
  data = fs.readFileSync('input.txt', 'utf8');
} catch (err) {

}

const test_input = data.split('\r\n');
//const test_input = ['two1nine', 'eightwothree', 'abcone2threexyz', 'xtwone3four', '4nineeightseven2', 'zoneight234', '7pqrstsixteen'];

const validDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

let digitsFound = [];

test_input.map((str, idx) => {
    let numAdded = 0;
    let firstNum;
    let secondNum;

    for(let i = 0; i < str.length; i++){
        const parsed = parseInt(str[i]);

        if(!Number.isNaN(parsed)){
            if(numAdded === 0){
                firstNum = parsed;
                numAdded++;
            } else {
                secondNum = parsed;
            }
        } else {
            validDigits.forEach((numStr, index) => {
                let c = 0;
                while(c < numStr.length){
                    if(str[i + c] === numStr[c])
                        c++;
                    else 
                        break;
                }

                if(c === (numStr.length)){
                    if(numAdded === 0){
                        firstNum = index + 1;
                        numAdded++;
                    } else {
                        secondNum = index + 1;
                    }
                }
            })

        }
    }

    digitsFound.push({firstNum, secondNum});
});

let sums = [];

digitsFound.map((obj, index) => {
    let numStr = `${obj.firstNum}`;

    if(obj.secondNum === undefined){
        numStr += `${obj.firstNum}`;
    } else {
        numStr += `${obj.secondNum}`;
    }

    sums[index] = parseInt(numStr);
})


let totalSum = 0;

sums.map(num => {
    totalSum += parseInt(num);
});

console.log(totalSum);