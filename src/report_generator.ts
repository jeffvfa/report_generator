'use strict';

import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import complexityCalculator from './complexity_functions/all_complexities_calculator';
import retrieveCategoryFromFile from './object_transformers/retrieve_category_from_file';
import formatCommitsToTaskList from './object_transformers/format_commits_to_task_list';
import applyAddedVersusModifiedRuleToTaskList from './object_transformers/apply_added_versus_modified_rule_to_task_list';
import calculateComplexityForTaskList from './object_transformers/calculate_complexity_for_task_list';
import generateReport from './object_transformers/generate_report_from_task_list';

const main = (jsonFilesDirectory: string = 'output', rootDirectory: string, taskListInput: string[] = []): void => {
	console.log('Iniciando Report Generator');
	console.log('\n\n**** Parâmetros utilizados ****:\n');
	console.log('Arquivo de log: ' + jsonFilesDirectory);
	console.log('Root directory: ' + rootDirectory);
	console.log('Lista de tasks: ' + taskListInput.join(', ') || '[]');

	console.log('\n\nIniciando Parse dos Arquivos no diretorio ' + jsonFilesDirectory);

	let commits: IGitLogOutput[] = [];
	const files = fs.readdirSync(jsonFilesDirectory);
	files.forEach((file) => {
		if (file.includes('gitlog')) {
			let rawdata = fs.readFileSync(jsonFilesDirectory + '/' + file, 'utf8');
			rawdata = rawdata.replace(/\s/g, ' ');
			let parsedJson = null;
			try {
				parsedJson = JSON.parse(rawdata);
			} catch (err) {
				console.log('Error parsing file: ' + file);
				console.log('It will be ignored');
			}
			if (parsedJson) commits = commits.concat(parsedJson);
		}
	});

	console.log('Parse realizado com sucesso!!!');

	console.log('\n\nbuilding task list');
	const taskList = formatCommitsToTaskList(commits, retrieveCategoryFromFile, taskListInput);
	console.log('building Complete');

	console.log('\n\nAppying AddedVersusModified Rule to tasklist');
	const ruledTaskList = applyAddedVersusModifiedRuleToTaskList(taskList);
	console.log('Rule Appliance complete');

	console.log('\n\nAppying Complexity calculation to tasklist');
	const calculatedTaskList = calculateComplexityForTaskList(ruledTaskList, complexityCalculator);
	console.log('Rule Appliance complete');
	fse.outputFile(
		'output/filesWithCalculatedComplexities.json',
		JSON.stringify(calculatedTaskList, null, '\t'),
		(err) => console.log(err),
	);

	const attributesRawData = fs.readFileSync('src/attribute_values.json', 'utf8');
	const worksheetAttributes: TWorksheetAttributes = JSON.parse(attributesRawData);
	generateReport(calculatedTaskList, worksheetAttributes);
};

const rootDirectory = process.argv[2];
const taskListInputFromCommandLine = process.argv[3]?.split(',')?.map((el) => el.trim()) || [];
main(path.join(__dirname, '../output'), rootDirectory, taskListInputFromCommandLine);
// main('gitlog_example.json', ['1227478', '1226939', '1225507']);
