fs = require('fs');

async function main() {
    const input = await fs.promises.readFile('input.txt', 'utf-8');
    const lines = input.split('\n').filter((s) => s !== "").map(element => {
        return Number.parseInt(element);
    });
    
    const uniqueNumbers = new Set(lines);
    const sum = 2020;

    const num = lines.find(i => {
        return uniqueNumbers.has(sum - i);
    });

    if (num){
        console.log('desired numbers are ', num, sum-num);
        console.log('desired response is ', num * (sum-num));
    }
}

main();