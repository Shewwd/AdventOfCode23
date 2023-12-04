const fs = require('node:fs');

let data;
try {
  data = fs.readFileSync('input.txt', 'utf8');
} catch (err) {

}

let lines = data.split('\r\n');

const getNumLineMatches = (line) => {
    const split = line.split(':')[1].split('|');
    const cardAcc = split[0].trim();
    const cardWin = split[1].trim();

    let acc = [];
    for(let i = 0; i < cardAcc.length; i++){
        if(!Number.isNaN(parseInt(cardAcc[i]))){
            let numStr = "";
            let idx = i;
            do{
                numStr += cardAcc[idx];
                idx++;
            } while (!Number.isNaN(parseInt(cardAcc[idx])))   
            acc.push(parseInt(numStr));
            i = idx;
        }
    }

    let win = [];
    for(let i = 0; i < cardWin.length; i++){
        if(!Number.isNaN(parseInt(cardWin[i]))){
            let numStr = "";
            let idx = i;
            do{
                numStr += cardWin[idx];
                idx++;
            } while (!Number.isNaN(parseInt(cardWin[idx])))   
            win.push(parseInt(numStr));
            i = idx;
        }
    }

    let matches = 0;

    acc.forEach( x => {
        let exists = false;

        win.forEach( w => {
            if(x === w )
                exists = true;
        })

        if(exists){
            matches++;
        }
    })

    return(matches);
}

let matches = [];

lines.forEach((line, index) => {
    matches[index] = {wins: getNumLineMatches(line), count: 1}
})

console.log(matches);

for(let i = 0; i < matches.length; i++) {
    console.log('card ' + (i + 1) + ' has ' + matches[i].wins + ' wins');
    for(let j = 0; j < matches[i].wins; j++){
        console.log('   adding ' + matches[j].count + ' wins to card ' + (i + 1 + j + 1));
        matches[i + 1 + j].count += matches[i].count;
    }
}

console.log(matches);

let cardSum = 0;

matches.forEach(x => {
    cardSum += x.count;
})

console.log(cardSum);