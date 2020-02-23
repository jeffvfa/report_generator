'use strict';

import {arrayUnique} from "../helpers/Array.helper";

const removeFileDuplicates = (filePropertiesList: TFileProperties[]): TFileProperties[] => {
    const filesList = filePropertiesList.map(el => {
        return {filePath: el.filePath, diffType: el.diffType};
    });
    let contructedList = filePropertiesList.map(el => Object.assign({}, el));

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

export default applyAddedVersusModifiedRuleToTaskList;