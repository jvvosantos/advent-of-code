fs = require('fs');

function parseOperation(operationStr) {
    const [operation, value] = operationStr.split(' ');
    return [operation, Number.parseInt(value)];
}

async function main() {
    const input = await fs.promises.readFile('sample.txt', 'utf-8');
    let lines = input.split('\n').filter((s) => s !== "");

    let visitedOperations = [];
    let acc = 0;
    let operationIndex = 0;
    let currentOperation;
    let [operation, value] = ['', 0];

    let i = 0;

    while (operationIndex < lines.length) {
        i++;
        if (i > 15) break;
        currentOperation = lines[operationIndex];
        [operation, value] = parseOperation(currentOperation);

        console.log(operationIndex, currentOperation, visitedOperations);

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

        console.log(operationIndex);

        if (visitedOperations.includes(operationIndex)){
            // change bugged operation
            const buggedOperationIndex = visitedOperations[visitedOperations.length-1];
            const buggedOperation = lines[buggedOperationIndex];
            const newOperation = buggedOperation.includes("jmp") ? buggedOperation.replace("jmp", "nop") : buggedOperation.replace("nop", "jmp");
            
            console.log(buggedOperation, buggedOperationIndex, newOperation);

            lines[buggedOperationIndex] = newOperation;

            // reset values and restart
            operationIndex = 0;
            visitedOperations = [];
            continue;
        }

        visitedOperations.push(operationIndex);
    }

    console.log(acc);
}

main();