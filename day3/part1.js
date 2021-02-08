fs = require('fs');

function isTree(square){
    return square == '#';
}

async function main() {
    const input = await fs.promises.readFile('input.txt', 'utf-8');
    const lines = input.split('\n').filter((s) => s !== "");

    let i = 0;
    let j = 0;
    let numTrees = 0;
    while (i+1 < lines.length) {
        if (j+3 >= lines[i].length){
            j = 3 - (lines[i].length - j);
        }
        else {
            j += 3;
        }
        i++;
        if (isTree(lines[i][j])){
            numTrees++;
        }
    }

    console.log(numTrees);
}

main();