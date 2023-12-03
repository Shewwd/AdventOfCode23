const fs = require('node:fs');

let data;
try {
  data = fs.readFileSync('input.txt', 'utf8');
} catch (err) {

}

const lines = data.split('\r\n');

let partNumbers = [];

let numberStarLocations = [];

lines.forEach((line, index) => {
    let lineNumbers = [];
    for(let i = 0; i < line.length; i++){
        if(!Number.isNaN(parseInt(line[i]))){
            const startIndex = i;

            let endIndex = i;
            while(line[endIndex + 1] !== undefined && !Number.isNaN(parseInt(line[endIndex + 1]))){
                endIndex++;
            }

            let lineNumStr = '';
            for(let j = startIndex; j <= endIndex; j++){
                lineNumStr += line[j];
            }

            lineNumbers.push({lineNum: parseInt(lineNumStr), startIndex, endIndex});

            i = endIndex + 1;
        }
    }

    if (lineNumbers != []) {
        lineNumbers.forEach(lineNumber => {

            let isValid = false;
            for(let j = (index - 1); j < (index + 2); j++){
                for(let k = (lineNumber.startIndex - 1); k < (lineNumber.startIndex + ((lineNumber.endIndex - lineNumber.startIndex) + 2)); k++){
                    if(j !== -1 && j !== lines.length && k !== -1 && k !== line.length){
                        if(lines[j][k] === '*'){
                            isValid = true;

                            numberStarLocations.push({LineNumber: lineNumber.lineNum, StarLocation: {x: j, y: k}})
                        }
                    }
                }
            }

            if(isValid)
                partNumbers.push(lineNumber.lineNum);
        })
    }
})

console.log(partNumbers);

let sum = 0;
partNumbers.forEach(x => {sum += x;})
console.log(sum);

let groups = [];

numberStarLocations.forEach((x, index) => {
    const group = numberStarLocations.filter(y => y.StarLocation.x === x.StarLocation.x && y.StarLocation.y === x.StarLocation.y);
    
    // Check if this group is unique compared to previous groups
    let isUnique = true;
    for (let i = 0; i < index; i++) {
        if (
            JSON.stringify(groups[i]?.sort()) === JSON.stringify(group.sort())
        ) {
            isUnique = false;
            break;
        }
    }

    // If unique, add it to the groups array
    if (isUnique) {
        groups.push(group);
    }
})

groups = groups.filter(x => x.length === 2);

console.log(groups);

let gearsum = 0;

groups.forEach(x => {
    gearsum += x[0].LineNumber * x[1].LineNumber;
})

console.log(gearsum);