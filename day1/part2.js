fs = require('fs');

async function main() {
    const input = await fs.promises.readFile('input.txt', 'utf-8');
    const lines = input.split('\n').filter((s) => s !== "").map(element => {
        return Number.parseInt(element);
    });
    
    const sum = 2020;

    const allSums = {};

    lines.forEach(i => {
        lines.forEach(j => {
            allSums[i+j] = [i, j];
        });
    });

    const thirdOne = lines.find(i => {
        return allSums[sum-i];
    });

    const [i, j] = allSums[sum-thirdOne];

    console.log(i*j*thirdOne);
}

main();