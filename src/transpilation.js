import * as parser from '@babel/parser';
import generate from '@babel/generator';
import prettier from 'prettier';

import chalk from 'chalk';

export default function transpilation(code, sourcePath = '', migration) {
    let ast;
    try {
        ast = parser.parse(code, {
            sourceType: 'module',
            plugins: ['classProperties', 'objectRestSpread', 'exportDefaultFrom', 'exportNamespaceFrom'],
            loose: ['es6.modules'],
        });
    } catch(e) {
        console.log(chalk.bold.red(`[Error]: Invalid code by ${sourcePath}`));
        console.log(chalk.bold.red(`\t${e.message}`));
        return null;
    }

    if (migration instanceof Function) {
        ast = migration(ast, (from, to) => logRename(from, to, sourcePath));
    } else {
        console.log(chalk.red('Migration incorret!'));
        return null;
    }

    if (!ast) return null;

    const output = generate(ast, {}, code);
    output.code = prettier.format(output.code, {
        printWidth: 120,
        trailingComma: 'es5',
        tabWidth: 4,
        singleQuote: true,
        parser: 'babel',
    });
    return output;
}

function logRename(from, to, by) {
    console.log(
        chalk.cyan('Replaced:'),
        chalk.red(from),
        chalk.cyan('to:'),
        chalk.green(to),
        chalk.cyan('by:'),
        chalk.gray(by)
    );
}
