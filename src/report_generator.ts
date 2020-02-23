'use strict';

import fs from 'fs';
import {arrayUnique} from './helpers/Array.helper';
import complexityCalculator from './complexity_functions/all_complexities_calculator';

namespace report_generator {

    const retrieveCategoryFromFile = (filePath: string): TFileCategory | undefined => {
        //if (!filePath) throw new Error('No File Path Available');
        if (!filePath) return undefined;

        // recupera somente o nome e a extensão do arquivo.
        const fileName = String(filePath.split('\\').pop()!.split('/').pop());

        // Categorias possiveis: test, js, html, css, java, key-value, scala
        if (fileName.includes('spec') && (fileName.includes('.js') || fileName.includes('.ts'))) return 'TEST';
        else if (fileName.includes('Test')) return 'TEST';
        else if (fileName.includes('.java')) return 'JAVA';
        else if (fileName.includes('.js') || fileName.includes('.ts')) return 'JAVASCRIPT';
        else if (fileName.includes('.xml') || fileName.includes('.json')) return 'KEY_VALUE';
        else if (fileName.includes('.css')) return 'CSS';
        else if (fileName.includes('.html')) return 'HTML';
        else if (fileName.includes('.scala')) return 'SCALA';
        return 'OUTRO';
    };

    const buildFileObjects = (y: IGitLogOutput, projectPath: string): TFileProperties[] => {
        return (y.files || [])
            // remove renamed files
            .filter(el => el.split(' ')[0][0] !== 'R')
            // build file object
            .map(el => {
                let elSplited = el.split(' ');
                const filePath = projectPath + elSplited[1];
                return {
                    diffType: elSplited[0],
                    filePath,
                    category: retrieveCategoryFromFile(filePath),
                    complexity: null
                } as TFileProperties
            });
    };


    const formatCommitsToTaskList = (commits: IGitLogOutput[]) => {
        return commits.reduce<TTaskProperties>((acc, y) => {
            let task = y.message.substr(5, 7);
            const projectPath = y.directory || '';
            acc[task] = acc[task] || [];
            acc[task] = arrayUnique(acc[task].concat(buildFileObjects(y, projectPath)), (el1, el2) => {
                return el1.diffType === el2.diffType &&
                    el1.filePath === el2.filePath &&
                    el1.complexity === el2.complexity &&
                    el1.category === el2.category
            });
            return acc
        }, {});
    };

    const removeFileDuplicates = (filePropertiesList: TFileProperties[]): TFileProperties[] => {
        const filesList = filePropertiesList.map(el => {
            return {filePath: el.filePath, diffType: el.diffType};
        });
        let contructedList = filePropertiesList.map(el => el);
        filesList.forEach(el => {
            if (el.diffType === 'A') contructedList.filter(el2 => el2.filePath === el.filePath).forEach(el3 => el3.diffType = 'A');
        });

        return arrayUnique(contructedList, (el1, el2) => {
            return el1.diffType === el2.diffType &&
                el1.filePath === el2.filePath &&
                el1.complexity === el2.complexity &&
                el1.category === el2.category
        });
    };

    const applyAddedVersusModifiedRuleToTaskList = (taskList: TTaskProperties): TTaskProperties => {
        let ruledTaskList: TTaskProperties = {};
        Object.keys(taskList).forEach(k => {
            ruledTaskList[k] = removeFileDuplicates(taskList[k]);
        });
        return ruledTaskList;
    };

    const calculateComplexityForTaskList = (taskList: TTaskProperties): TTaskProperties => {
        const calculatedTaskList = Object.assign<{}, TTaskProperties>({}, taskList);
        Object.keys(calculatedTaskList).forEach(k => {
            calculatedTaskList[k].forEach(fileprops => {
                fileprops.complexity = complexityCalculator[fileprops.category]!(fileprops.filePath);
            });
        });
        return calculatedTaskList;
    };

    const main = (): void => {
        console.log("Iniciando Report Generator");

        // let rawdata = fs.readFileSync('output/gitlog0.json', 'utf8');
        console.log("\n\nIniciando Parse Arquivo gitlog.json");
        let rawdata = fs.readFileSync('gitlog.json', 'utf8');
        rawdata = rawdata.replace(/\s/g, ' ');
        const commits: IGitLogOutput[] = JSON.parse(rawdata);
        console.log("Parse realizado com sucesso!!!");

        console.log('\n\nbuilding task list');
        const taskList = formatCommitsToTaskList(commits);
        console.log('building Complete');

        console.log('\n\nAppying AddedVersusModified Rule to tasklist');
        const ruledTaskList = applyAddedVersusModifiedRuleToTaskList(taskList);
        console.log('Rule Appliance complete');

        console.log('\n\nAppying Complexity calculation to tasklist');
        const calculatedTaskList = calculateComplexityForTaskList(ruledTaskList);
        console.log('Rule Appliance complete');
        fs.writeFile('saida1.json', JSON.stringify(calculatedTaskList, null, '\t'), err => console.log(err));
    };

    main();
}
