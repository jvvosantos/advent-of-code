fs = require('fs');

async function main() {
    const input = await fs.promises.readFile('input.txt', 'utf-8');
    const lines = input.split('\n\n').filter((s) => s !== "");
    
    let totalYes = 0;

    lines.forEach(line => {
        let answers = line.split('\n');
        if (answers.length > 1){
            let answerOccurrences = answers.reduce((acc, answer) => {
                answer.split('').forEach(uniqueAnswer => {
                    acc[uniqueAnswer] ? acc[uniqueAnswer]++ : acc[uniqueAnswer] = 1;
                });
                
                return acc;
            }, {});

            Object.keys(answerOccurrences).forEach(k => {
                if (answerOccurrences[k] == answers.length){
                    totalYes += 1;
                }
            });
        }
        else {
            totalYes += answers[0].length;
        }
    });

    console.log(totalYes);
}

main();