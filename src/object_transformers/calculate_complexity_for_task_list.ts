'use strict';

const calculateComplexityForTaskList = (
	taskList: TTaskProperties,
	complexityCalculator: TComplexityCalculator,
): TTaskProperties => {
	const calculatedTaskList = Object.assign({}, taskList);
	Object.keys(calculatedTaskList).forEach((k) => {
		calculatedTaskList[k].forEach((fileprops) => {
			fileprops.complexity = complexityCalculator[fileprops.category]!(fileprops.filePath);
		});
	});
	// Object.keys(calculatedTaskList).forEach((k) => {
	// 	calculatedTaskList[k].forEach((fileprops) => {
	// 		fileprops.filePath = fileprops.filePath.replace(fileprops, '');
	// 	});
	// });
	return calculatedTaskList;
};

export default calculateComplexityForTaskList;
