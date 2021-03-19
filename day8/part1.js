fs = require('fs');

function parseOperation(operationStr) {
    const [operation, value] = operationStr.split(' ');
    return [operation, Number.parseInt(value)];
}

async function main() {
    const input = await fs.promises.readFile('input.txt', 'utf-8');
    const lines = input.split('\n').filter((s) => s !== "");

    let visitedOperations = [];
    let acc = 0;
    let operationIndex = 0;
    let currentOperation;
    let [operation, value] = ['', 0];

    while (operationIndex < lines.length) {
        currentOperation = lines[operationIndex];
        [operation, value] = parseOperation(currentOperation);

        switch (operation) {
            case 'acc':
                acc += value;
                operationIndex += 1;
                break;
            case 'jmp':
                operationIndex += value;
                break;
            case 'nop':
                operationIndex += 1;
                break;
        }

        if (visitedOperations.includes(operationIndex)){
            //found loop
            break;
        }

        visitedOperations.push(operationIndex);
    }

    console.log(acc);
}

main();