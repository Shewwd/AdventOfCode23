const fs = require('node:fs');

let data;
try {
  data = fs.readFileSync('input.txt', 'utf8');
} catch (err) {

}

const test_input = data.split('\r\n');

let digits = [];

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
        }
    }

    digits.push({firstNum, secondNum});
});

console.log(digits);

let sums = [];

digits.map((obj, index) => {
    let numStr = `${obj.firstNum}`;

    if(obj.secondNum === undefined){
        numStr += `${obj.firstNum}`;
    } else {
        numStr += `${obj.secondNum}`;
    }

    sums[index] = parseInt(numStr);
})

console.log(sums);


let totalSum = 0;

sums.map(num => {
    totalSum += parseInt(num);
});

console.log(totalSum);