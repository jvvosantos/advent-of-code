fs = require('fs');

function parseLine(line) {
    const splitLines = line.split(' ');
    const [min, max] = splitLines[0].split('-');
    const character = splitLines[1][0];
    const password = splitLines[2];

    return {
        min: min,
        max: max,
        target: character,
        password: password
    };
}

function parseLines(lines) {
    return lines.map(line => parseLine(line));
}

function countOccurrences(line, target) {
    let regex = new RegExp(target, 'g');

    return (line.match(regex) || []).length;
}

function isAcceptRule(rule){
    let occurrences = countOccurrences(rule.password, rule.target);
    return (occurrences >= rule.min) && (occurrences <= rule.max);
}

async function main() {
    const input = await fs.promises.readFile('input.txt', 'utf-8');
    const lines = input.split('\n').filter((s) => s !== "");

    const allRules = parseLines(lines);

    const rulesWithOutcome = allRules.map(rule => {
        rule['accepted'] = isAcceptRule(rule);
        return rule;
    });

    const validPasswords = rulesWithOutcome.filter(rule => rule.accepted).length;

    console.log(validPasswords);
}

main();