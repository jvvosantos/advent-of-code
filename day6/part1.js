fs = require('fs');

async function main() {
    const input = await fs.promises.readFile('input.txt', 'utf-8');
    const lines = input.split('\n\n').filter((s) => s !== "");
    
    let totalYes = 0;

    lines.forEach((line, i) => {
        let answers = line.split('\n').join('');
        let uniqueAnswers = new Set(answers);
        totalYes += uniqueAnswers.size;
    });

    console.log(totalYes);
}

main();