function isNumberLine(line){

    return line != undefined && !Number.isNaN(parseInt(line[0]));
}

function getDestinationSourceRange(line){

    const split = line.split(' ');
    return ({ DestinationRangeStart: parseInt(split[0]), SourceRangeStart: parseInt(split[1]), RangeLength: parseInt(split[2]) });
}

function numberInSource(number, source){
    return source.SourceRangeStart <= number && number < (source.SourceRangeStart + source.RangeLength);
}

function GetCorrespondingNumbers(sourceInput, map){

    let returnInput = [];

    sourceInput.forEach( input => {

        let i = 0;
        while(i  < map.length && !numberInSource(input, map[i])){
            i++;
        }

        if(i >= map.length){
            returnInput.push(input);
        }else{
            returnInput.push((map[i].DestinationRangeStart - map[i].SourceRangeStart) + input);
        }
    })

    return returnInput;
}

//////////////////////////////////////////////////////////////////


const fs = require('node:fs');

let data;
try {
  data = fs.readFileSync('input.txt', 'utf8');
} catch (err) {

}

let lines = data.split('\r\n');

const seeds = lines[0].split(' ').slice(1);

lines = lines.slice(3);

let maps = [];

let i = 0;
while(i < lines.length){
    if(isNumberLine(lines[i])){

        let map = [];

        let lineIdx = i;
        while(isNumberLine(lines[lineIdx])){

            const line = getDestinationSourceRange(lines[lineIdx]);
            map.push(line);
            lineIdx++; 
        }

        maps.push(map);

        i = lineIdx + 1;
    }
    i++;
}

let input = seeds.map(seed => {
    return parseInt(seed);
});

maps.forEach((map, index) => {

    input = GetCorrespondingNumbers(input, map);

})

console.log(Math.min(...input));