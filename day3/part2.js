fs = require('fs');

function isTree(square){
    return square == '#';
}

function slideDown(lines, slopeRight, slopeDown){
    let i = 0;
    let j = 0;
    let numTrees = 0;
    while (i+slopeDown < lines.length) {
        if (j+slopeRight >= lines[i].length){
            j = slopeRight - (lines[i].length - j);
        }
        else {
            j += slopeRight;
        }
        i+=slopeDown;
        if (isTree(lines[i][j])){
            numTrees++;
        }
    }

    return numTrees;
}

async function main() {
    const input = await fs.promises.readFile('input.txt', 'utf-8');
    const lines = input.split('\n').filter((s) => s !== "");

    const outs = [];

    outs.push(slideDown(lines, 1, 1));
    outs.push(slideDown(lines, 3, 1));
    outs.push(slideDown(lines, 5, 1));
    outs.push(slideDown(lines, 7, 1));
    outs.push(slideDown(lines, 1, 2));

    const res = outs.reduce((acc, numTrees) => {
        return acc * numTrees;
    });

    console.log(res);
}

main();