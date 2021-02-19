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

function searchParents(rules, target) {
    return rules.filter(rule => rule.contents[target]);
}

async function main() {
    const input = await fs.promises.readFile('input.txt', 'utf-8');
    const lines = input.split('\n').filter((s) => s !== "");

    const rules = parseLines(lines);

    const target = 'shiny gold';

    let parents = searchParents(rules, target);

    let allBags = new Set();

    while (parents.length > 0) {
        parents.forEach(parent => {
            allBags.add(parent.bag)
        });
        parents = parents.map(parent => searchParents(rules, parent.bag))
                                            .reduce((acc, parents) => {
                                                return acc.concat(parents);
                                            }, []);

    }

    console.log(allBags.size);
}

main();