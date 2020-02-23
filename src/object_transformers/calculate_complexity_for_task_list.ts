'use strict';
//import complexityCalculator from "../complexity_functions/all_complexities_calculator";

const calculateComplexityForTaskList = (taskList: TTaskProperties, complexityCalculator: TComplexityCalculator): TTaskProperties => {
    const calculatedTaskList = Object.assign<{}, TTaskProperties>({}, taskList);
    Object.keys(calculatedTaskList).forEach(k => {
        calculatedTaskList[k].forEach(fileprops => {
            fileprops.complexity = complexityCalculator[fileprops.category]!(fileprops.filePath);
        });
    });
    return calculatedTaskList;
};

export default calculateComplexityForTaskList;