const test_input = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'];

let digits = [];

const nums = 

test_input.forEach((str, index) => {
    for(let i = 0; i < str.length; i++){
        const parsed = parseInt(str[i]);

        if(parsed != NaN)
            digits[index].push(parsed);
    }
});

console.log(digits);
