require('babel-register');
const glob = require("glob");
const chalk = require('chalk');
const modifier = require('./src/modifier').default;

if (!process.argv[2]) {
    throw 'Required one argument path';
}

let migration = null;

if (process.argv[3]) {
    try {
        migration = require(`./migrations/${process.argv[3]}.js`).default;
        console.log(chalk.yellow(`Migration loaded: ${process.argv[3]}`));
    } catch(e) {
        console.log(chalk.red(`Module not found: "${__dirname}/migrations/${process.argv[3]}.js"`));
        return;
    }
}

glob(process.argv[2], (err, files) => {
    if (err) throw err;
    for (const filePath of files) {
        modifier(filePath, migration);
    }
});
