require('@babel/register');
const glob = require("glob");
const chalk = require('chalk');
const modifier = require('./src/modifier').default;

let migration = null;
const excludePattern = new RegExp(process.argv[4] + '|(node_modules|vendor)', 'i');

// Проверяем наличие пути и миграции
if (!process.argv[2] || !process.argv[3]) {
    throw 'Required two arguments: `path-to-source`; `path-to-migration` in folder `/migrations`.';
}

try {
    migration = require(`./migrations/${process.argv[3]}.js`).default;
    console.log(chalk.yellow(`Migration loaded: ${process.argv[3]}`));
} catch(e) {
    console.log(chalk.red(`Module not found: "${__dirname}/migrations/${process.argv[3]}.js"`));
    return;
}

glob(process.argv[2], (err, files) => {
    if (err) throw err;
    for (const filePath of files) {
        if (excludePattern && excludePattern.test(filePath)) {
            console.log(chalk.yellow('Exclude:'), chalk.gray(filePath));
            continue;
        }
        modifier(filePath, migration);
    }
});
