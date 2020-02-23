'use strict';

import {arrayUnique} from "../helpers/Array.helper";

const buildFileObjects = (y: IGitLogOutput, projectPath: string, retrieveCategoryFromFile: (arg0: string) => TFileCategory | undefined): TFileProperties[] => {
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
            const filePath = projectPath + elSplited[1];
            return {
                diffType: elSplited[0],
                filePath,
                category: retrieveCategoryFromFile(filePath),
                complexity: null
            } as TFileProperties
        });
};

const formatCommitsToTaskList = (commits: IGitLogOutput[], retrieveCategoryFromFile: (arg0: string) => TFileCategory | undefined) => {
    return commits.reduce<TTaskProperties>((acc, y) => {
        let task = y.message.substr(5, 7);
        const projectPath = y.directory || '';
        acc[task] = acc[task] || [];
        acc[task] = arrayUnique(acc[task].concat(buildFileObjects(y, projectPath, retrieveCategoryFromFile)), (el1, el2) => {
            return el1.diffType === el2.diffType &&
                el1.filePath === el2.filePath &&
                el1.complexity === el2.complexity &&
                el1.category === el2.category
        });
        return acc
    }, {});
};

export default formatCommitsToTaskList;