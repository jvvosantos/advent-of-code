fs = require('fs');

function defRow(pass) {
    let lo = 0;
    let hi = 127;

    for (let i = 0; i < 7; i++) {
        switch (pass[i]) {
            case 'F':
                hi = Math.floor((lo + hi) / 2);
                break;
            case 'B':
                lo = Math.ceil((lo + hi) / 2);
                break;
        }
    }

    return lo;
}

function defCol(pass) {
    let lo = 0;
    let hi = 7;

    for (let i = 7; i < pass.length; i++) {
        switch (pass[i]) {
            case 'L':
                hi = Math.floor((lo + hi) / 2);
                break;
            case 'R':
                lo = Math.ceil((lo + hi) / 2);
                break;
        }
    }

    return lo;
}

function findMissingValue(arr) {
    let sumTotal = ((arr.length + 1) * (arr[0] + arr[arr.length - 1])) / 2;

    arr.forEach(a => {
        sumTotal -= a;
    });

    return sumTotal
}

async function main() {
    const input = await fs.promises.readFile('input.txt', 'utf-8');
    const lines = input.split('\n').filter((s) => s !== "");

    const occupiedSeats = lines.map(line => {
        let row = defRow(line);
        let col = defCol(line);
        let seatId = (row * 8) + col;

        return seatId;
    });

    occupiedSeats.sort((a, b) => a - b);

    const missingValue = findMissingValue(occupiedSeats);

    console.log(missingValue);
}

main();