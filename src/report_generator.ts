'use strict';

import fs from 'fs';
import fse from 'fs-extra';
import complexityCalculator from './complexity_functions/all_complexities_calculator';
import retrieveCategoryFromFile from './object_transformers/retrieve_category_from_file';
import formatCommitsToTaskList from './object_transformers/format_commits_to_task_list';
import applyAddedVersusModifiedRuleToTaskList
    from './object_transformers/apply_added_versus_modified_rule_to_task_list';
import calculateComplexityForTaskList from './object_transformers/calculate_complexity_for_task_list';
import generate_report from './object_transformers/generate_report_from_task_list';

namespace report_generator {

    const main = (jsonFilepath: string = 'gitlog_example.json', taskListInput: string[] = []): void => {
        console.log('Iniciando Report Generator');
        console.log('Parâmetros utilizados:\n\n');
        console.log('Arquivo de log: ' + jsonFilepath);
        console.log('Lista de tasks: ' + taskListInput.join(', ') || '[]');

        // let rawdata = fs.readFileSync('output/gitlog0.json', 'utf8');
        console.log('\n\nIniciando Parse Arquivo ' + jsonFilepath);
        let rawdata = fs.readFileSync(jsonFilepath, 'utf8');
        rawdata = rawdata.replace(/\s/g, ' ');
        const commits: IGitLogOutput[] = JSON.parse(rawdata);
        console.log('Parse realizado com sucesso!!!');

        console.log('\n\nbuilding task list');
        const taskList = formatCommitsToTaskList(commits, retrieveCategoryFromFile);
        console.log('building Complete');

        console.log('\n\nAppying AddedVersusModified Rule to tasklist');
        const ruledTaskList = applyAddedVersusModifiedRuleToTaskList(taskList);
        console.log('Rule Appliance complete');

        console.log('\n\nAppying Complexity calculation to tasklist');
        const calculatedTaskList = calculateComplexityForTaskList(ruledTaskList, complexityCalculator);
        console.log('Rule Appliance complete');
        fse.outputFile('output/saida1.json', JSON.stringify(calculatedTaskList, null, '\t'), err => console.log(err));

        const attributesRawData = fs.readFileSync('src/attribute_values.json', 'utf8');
        let worksheetAttributes: TWorksheetAttributes = JSON.parse(attributesRawData);
        generate_report(calculatedTaskList, worksheetAttributes);

    };

    const taskListInput = process.argv[2]?.split(',')?.map(el => el.trim()) || [];
    console.log('task list: ' + taskListInput.join(', '));
    main('output/gitlog0.json');

}
