fs = require('fs');

function parseLines(lines) {

    let rules = lines.map(line => {
        return line.replaceAll('\n', ' ').split(' ').reduce((acc, current) => {
            let [rule, value] = current.split(':');
            acc[rule] = value;
            return acc;
        }, {})
    });

    return rules;
}

const desiredRules = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];

function isValidRule(rule) {
    
    return desiredRules.every(desiredRule => {
        if (desiredRule == 'cid') return true;
        return Object.keys(rule).includes(desiredRule);
    });
}

async function main() {
    const input = await fs.promises.readFile('input.txt', 'utf-8');
    const lines = input.split('\n\n').filter((s) => s !== "");

    const rules = parseLines(lines);

    const res = rules.filter(rule => isValidRule(rule)).length;

    console.log(res);
}

main();