
import fs from 'fs';
import path  from 'path';
import transpilation from './transpilation';
import chalk from 'chalk';

export default function modifier(filePath, migration) {
    // Get File
    const fullFilePath = path.join(__dirname, '..', filePath);
    const name = filePath.split('/').pop();

    if (!fs.lstatSync(fullFilePath).isFile()) {
        return console.log(chalk.bold.red(`[Error]: Not file "${fullFilePath}"`));
    }

    const code = fs.readFileSync(fullFilePath, 'utf8');

    // Edit source
    const output = transpilation(code, fullFilePath, migration);
    
    if (!output) return;

    // Save changes
    const outputFolderName = 'transpiled';
    if (!fs.existsSync(outputFolderName)) {
        fs.mkdirSync(outputFolderName);
    }
    const outputFileName  = path.join(__dirname, `../${outputFolderName}/${name}`);
    fs.writeFileSync(outputFileName, output.code);
    // fs.writeFileSync(fullFilePath, output.code);
}
