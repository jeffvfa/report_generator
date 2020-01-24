console.log("Iniciando Report Generator");

const projectName = '/gat-monitoracao/';
const css_complexity = require('./css_complexity').default;
console.log(css_complexity);


const fs = require('fs');

console.log("Iniciando Parse Arquivo gitlog.json");
let rawdata = fs.readFileSync('gitlog.json', 'utf8');
rawdata = rawdata.replace(/\s/g, ' ');
let commits = JSON.parse(rawdata);
console.log("Parse realizado com sucesso!!!");

function retrieveCategoryFromFile(filePath) {
    if (!filePath) return null;

    // recupera somente o nome e a extensão do arquivo.
    const fileName = filePath.split('\\').pop().split('/').pop();

    // Categorias possiveis: test, js, html, css, java, key-value, scala
    if (fileName.includes('spec') || fileName.includes('Test')) return 'TEST';
    else if (fileName.includes('.java')) return 'JAVA';
    else if (fileName.includes('.js') || fileName.includes('.ts')) return 'JAVASCRIPT';
    else if (fileName.includes('.xml') || fileName.includes('.json')) return 'KEY-VALUE';
    else if (fileName.includes('.css')) return 'CSS';
    else if (fileName.includes('.html')) return 'HTML';
    else if (fileName.includes('.scala')) return 'scala';
    return 'OUTTRO';
}

commitsByTask = commits.reduce((acc, y) => {
    let task = y.message.substr(5, 7);
    acc[task] = acc[task] || [];
    acc[task] = [...new Set(acc[task].concat(buildFileObjects(y)))];
    return acc
}, {});

function buildFileObjects(y) {
    return (y.files || [])
        // remove renamed files
        .filter(el => el.split(' ')[0][0] !== 'R')
        // build file object
        .map(el => {
            let elSplited = el.split(' ');
            return {
                diffType: elSplited[0],
                filePath: projectName + elSplited[1],
                complexity: null,
                category: retrieveCategoryFromFile(projectName + elSplited[1])
            }
        });
}

// verificar na mesma tarefa se existe modificado e adicionado para o mesmo arquivo e considerar adicionado
//allFiles = getAllFiles(commitsByTask);
//complexity = getFileComplexity(allFiles);
//finalObject = buildFinalObject(complexity, commitsByTask);
//formatAndExportExcel(finalObject) lembrar dos ritos;
//commita.reduce

console.log(commitsByTask);
