const parser = require('@babel/parser');
const path = require('path');
const fs = require('fs');

console.log('Start parsing...');

const filePath = path.join(__dirname, process.argv[2]);
const name = process.argv[2].split('/').pop();
const content = fs.readFileSync(filePath, 'utf8');

const ast = parser.parse(content, { sourceType: 'module' });

const outputFolderName = 'astJSON';
if (!fs.existsSync(outputFolderName)) fs.mkdirSync(outputFolderName);
const outputFileName  = path.join(__dirname, `./${outputFolderName}/ast-${name}.json`);
fs.writeFileSync(outputFileName, JSON.stringify(ast, null, '    '));

console.log('Complette:', outputFileName);

