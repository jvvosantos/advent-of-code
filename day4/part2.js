const { pid } = require('process');

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

function isValidPassport(passport) {
    let regex;

    return Object.keys(passport).every(key => {
        switch (key) {
            case 'byr':
                if (passport[key].length != 4) return false;
                let byr = Number.parseInt(passport[key]);
                return byr >= 1920 && byr <= 2002;
            case 'iyr':
                if (passport[key].length != 4) return false;
                let iyr = Number.parseInt(passport[key]);
                return iyr >= 2010 && iyr <= 2020;
            case 'eyr':
                if (passport[key].length != 4) return false;
                let eyr = Number.parseInt(passport[key]);
                return eyr >= 2020 && eyr <= 2030;
            case 'hgt':
                let lowerBound = 0;
                let upperBound = 0;
                if (passport[key].includes('cm')) {
                    lowerBound = 150;
                    upperBound = 193;
                }
                else if (passport[key].includes('in')) {
                    lowerBound = 59;
                    upperBound = 76;
                }
                else return false;
                let hgt = Number.parseInt(passport[key].substring(0, passport[key].length - 2));
                return hgt >= lowerBound && hgt <= upperBound;
            case 'hcl':
                regex = /#(([0-9])|([a-f])){6}$/;
                return regex.test(passport[key]);
            case 'ecl':
                regex = /(amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)/;
                return regex.test(passport[key]);
            case 'pid':
                if (passport[key].length > 9) return false;
                regex = /[0-9]{9}$/;
                return regex.test(passport[key]);
            case 'cid':
                return true;
        }
    });
}

async function main() {
    const input = await fs.promises.readFile('input.txt', 'utf-8');
    const lines = input.split('\n\n').filter((s) => s !== "");

    const rules = parseLines(lines);

    const validPassports = rules.filter(rule => isValidRule(rule));

    const res = validPassports.filter(validPassport => isValidPassport(validPassport)).length;

    console.log(res);
}

main();