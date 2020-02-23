'use strict';

import fs from 'fs';
import complexityCalculator from './complexity_functions/all_complexities_calculator';
import retrieveCategoryFromFile from "./object_transformers/retrieve_category_from_file";
import formatCommitsToTaskList from './object_transformers/format_commits_to_task_list';
import applyAddedVersusModifiedRuleToTaskList
    from './object_transformers/apply_added_versus_modified_rule_to_task_list';
import calculateComplexityForTaskList from './object_transformers/calculate_complexity_for_task_list';
import generate_report from './object_transformers/generate_report_from_task_list';

namespace report_generator {

    const main = (): void => {
        console.log("Iniciando Report Generator");

        // let rawdata = fs.readFileSync('output/gitlog0.json', 'utf8');
        console.log("\n\nIniciando Parse Arquivo gitlog_example.json");
        let rawdata = fs.readFileSync('gitlog_example.json', 'utf8');
        rawdata = rawdata.replace(/\s/g, ' ');
        const commits: IGitLogOutput[] = JSON.parse(rawdata);
        console.log("Parse realizado com sucesso!!!");

        console.log('\n\nbuilding task list');
        const taskList = formatCommitsToTaskList(commits, retrieveCategoryFromFile);
        console.log('building Complete');

        console.log('\n\nAppying AddedVersusModified Rule to tasklist');
        const ruledTaskList = applyAddedVersusModifiedRuleToTaskList(taskList);
        console.log('Rule Appliance complete');

        console.log('\n\nAppying Complexity calculation to tasklist');
        const calculatedTaskList = calculateComplexityForTaskList(ruledTaskList, complexityCalculator);
        console.log('Rule Appliance complete');
        fs.writeFile('output/saida1.json', JSON.stringify(calculatedTaskList, null, '\t'), err => console.log(err));
    };

    main();
    generate_report();
}
