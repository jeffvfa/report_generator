"use strict";
console.log("Iniciando Report Generator");
const css_complexity = require('./complexity_functions/css_complexity').default;
const karma_complexity = require('./complexity_functions/karma_complexity').default;

const fs = require('fs');

console.log("Iniciando Parse Arquivo gitlog.json");
let rawdata = fs.readFileSync('output/gitlog0.json', 'utf8');
rawdata = rawdata.replace(/\s/g, ' ');
let commits = JSON.parse(rawdata);
console.log("Parse realizado com sucesso!!!");

function retrieveCategoryFromFile(filePath) {
    if (!filePath) return null;
    let category, complexity = null;

    // recupera somente o nome e a extensão do arquivo.
    const fileName = filePath.split('\\').pop().split('/').pop();

    // Categorias possiveis: test, js, html, css, java, key-value, scala
    if (fileName.includes('spec') && (fileName.includes('.js') || fileName.includes('.ts'))) {
        category = 'TEST';
        complexity = 'TEST;' //karma_complexity(filePath);
    } else if (fileName.includes('Test')) {
        category = 'TEST';
    } else if (fileName.includes('.java')) return 'JAVA';
    else if (fileName.includes('.js') || fileName.includes('.ts')) category = 'JAVASCRIPT';
    else if (fileName.includes('.xml') || fileName.includes('.json')) category = 'KEY-VALUE';
    else if (fileName.includes('.css')) {
        category = 'CSS';
        complexity = 'TEST;' //css_complexity(filePath);
    } else if (fileName.includes('.html')) category = 'HTML';
    else if (fileName.includes('.scala')) category = 'scala';
    else category = 'OUTRO';

    return {
        category,
        complexity
    };
}

let commitsByTask = commits.reduce((acc, y) => {
    let task = y.message.substr(5, 7);
    const projectPath = y.directory;
    acc[task] = acc[task] || [];
    acc[task] = [...new Set(acc[task].concat(buildFileObjects(y, projectPath)))];
    return acc
}, {});

function buildFileObjects(y, projectPath) {
    return (y.files || [])
        // remove renamed files
        .filter(el => el.split(' ')[0][0] !== 'R')
        // build file object
        .map(el => {
            let elSplited = el.split(' ');
            return Object.assign({
                diffType: elSplited[0],
                filePath: projectPath + elSplited[1]
            }, retrieveCategoryFromFile(projectPath + elSplited[1]))
        });
}

// verificar na mesma tarefa se existe modificado e adicionado para o mesmo arquivo e considerar adicionado
//allFiles = getAllFiles(commitsByTask);
//complexity = getFileComplexity(allFiles);
//finalObject = buildFinalObject(complexity, commitsByTask);
//formatAndExportExcel(finalObject) lembrar dos ritos;
//commita.reduce

console.log(commitsByTask);
