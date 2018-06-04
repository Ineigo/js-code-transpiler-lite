
const fs = require('fs');
const path = require('path');
const transpilation = require('./transpilation').default;

export default function modifier(filePath, migration) {
    // Get File
    const fullFilePath = path.join(__dirname, '..', filePath);
    const name = filePath.split('/').pop();
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
}