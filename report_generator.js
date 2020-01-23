console.log("Iniciando Report Generator");

const projectName = '/gat-monitoracao/';
const fs = require('fs');

console.log("Iniciando Parse Arquivo gitlog.json");
let rawdata = fs.readFileSync('gitlog.json', 'utf8');
rawdata = rawdata.replace(/\s/g,' ');
let commits = JSON.parse(rawdata);
console.log("SUCESSO!!!");


commitsByTask = commits.reduce((acc,y) => {
    task = y.message.substr(5,7);
    acc[task] = acc[task] || [];
    acc[task] = [...new Set(acc[task].concat(buildFileObjects(y)))];
    return acc }, {});


function buildFileObjects(y) {
	return (y.files || [])
		// remove renamed files
		.filter(el => el.split(' ')[0][0] !== 'R')
		// build file object
		.map(el => {
			elSplited = el.split(' ');
			return {diffType: elSplited[0], filePath: projectName + elSplited[1]}
		});
}

// verificar na mesma tarefa se existe modificado e adicionado para o mesmo arquivo e considerar adicionado
//allFiles = getAllFiles(commitsByTask);
//complexity = getFileComplexity(allFiles);
//finalObject = buildFinalObject(complexity, commitsByTask);
//formatAndExportExcel(finalObject) lembrar dos ritos;
//commita.reduce

console.log(commitsByTask);
