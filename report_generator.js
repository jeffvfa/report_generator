console.log("Iniciando Report Generator");

const projectName = '/gat-monitoracao/';
const fs = require('fs');

console.log("Iniciando Parse Arquivo gitlog.json");
let rawdata = fs.readFileSync('gitlog.json', 'utf8');
rawdata = rawdata.replace(/\s/g, ' ');
let commits = JSON.parse(rawdata);
console.log("Parse realizado com sucesso!!!");


commitsByTask = commits.reduce((acc, y) => {
    let task = y.message.substr(5, 7);
    acc[task] = acc[task] || [];
    acc[task] = [...new Set(acc[task].concat(buildFileObjects(y)))];
    return acc
}, {});


function retriveCategoryFromFile(filePath) {
    if (!filePath) return null;
    // Categorias possiveis: test, js, html, java, key-value, scala

    // recupera somente o nome e a extensão do arquivo.
    const fileNmae = filePath.split('\\').pop().split('/').pop();
    if (fileNmae.includes('spec') || fileNmae.includes('Test')) return 'TEST';
    else if (fileNmae.includes('.java')) return 'JAVA';
    return 'OUTTRO'; //TODO Falta implementar as outras categorias
    // else if (fileNmae.includes('spec') || fileNmae.includes('Test')) return 'TEST';
    // else if (fileNmae.includes('spec') || fileNmae.includes('Test')) return 'TEST';
}

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
                category: retriveCategoryFromFile(projectName + elSplited[1])
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
