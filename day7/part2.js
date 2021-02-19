fs = require('fs');

function parseLines(lines) {
    return lines.map(line => {
        line = line.replace(' bags', '');
        let lineSplit = line.split(' contain ');
        let bag = lineSplit[0];
        let contents = lineSplit[1].split(', ').reduce((acc, ls) => {
            if (ls.includes('no other bag')) return {};
            acc[ls.substring(2, ls.indexOf('bag') - 1)] = +ls[0];
            return acc;
        }, {});

        return {
            bag,
            contents
        }
    });
}

function getNumBags(rules, target) {
    let numBags = 0;

    let bag = rules.filter(rule => rule.bag == target)[0];

    Object.entries(bag.contents).forEach(([child, count]) => {
        numBags += count;
        numBags += count * getNumBags(rules, child);
    });

    return numBags;
}

async function main() {
    const input = await fs.promises.readFile('input.txt', 'utf-8');
    const lines = input.split('\n').filter((s) => s !== "");

    const rules = parseLines(lines);

    const target = 'shiny gold';

    const numBags = getNumBags(rules, target);

    console.log(numBags);
}

main();