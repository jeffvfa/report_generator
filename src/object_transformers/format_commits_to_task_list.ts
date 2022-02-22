'use strict';

import { arrayUnique } from "../helpers/Array.helper";

const buildFileObjects = (y: IGitLogOutput, projectPath: string, retrieveCategoryFromFile: (arg0: string) => TFileCategory | undefined): TFileProperties[] => {
    const projectname = projectPath.split('/').filter(Boolean).pop();
   
    return (y.files || [])
        // remove renamed and deleted files
        .filter(el => {
            const differenceType = el.split(' ')[0][0];
            return differenceType !== 'R' && differenceType !== 'D'
            }
        )
        // build file objects
        .map(el => {
            let elSplited = el.split(' ');
            let task = (y.message.substr(5, 7).match(/\d+/g) || [])[0] || "";

            const filePath =  'Task: '+ task +' '+ projectPath + elSplited[1] + '#' + y.commit.slice(0,10);

            return {
                diffType: elSplited[0],
                filePath,
                category: retrieveCategoryFromFile(filePath),
                complexity: "BAIXA",
                rootDirectory: projectPath.replace(projectname! + '/', '')
            } as TFileProperties
        });
};

const formatCommitsToTaskList = (commits: IGitLogOutput[], retrieveCategoryFromFile: (arg0: string) => TFileCategory | undefined, taskListinput: string[] = []): TTaskProperties => {

    let initialTaskList: TTaskProperties = {};
    taskListinput.length > 0 && taskListinput.forEach(el => initialTaskList[el] = []);
    return commits.reduce<TTaskProperties>((acc, y) => {
        let task = (y.message.substr(5, 7).match(/\d+/g) || [])[0] || "";

        const projectPath = y.directory || '';

        if (taskListinput.length > 0) {
            if (!acc[task]) return acc;
        } else {
            acc[task] = acc[task] || [];
        }

        acc[task] = arrayUnique(acc[task].concat(buildFileObjects(y, projectPath, retrieveCategoryFromFile)), (el1, el2) => {
            return el1.diffType === el2.diffType &&
                el1.filePath === el2.filePath &&
                el1.complexity === el2.complexity &&
                el1.category === el2.category
        });
        return acc
    }, initialTaskList);
};

export default formatCommitsToTaskList;
