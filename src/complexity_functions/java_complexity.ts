'use strict';
import java from 'java';
import path from 'path';

const fullClassPath = path
	.join(
		__dirname,
		'../java_complexity/javaComplexityCalculator/out/artifacts/javaComplexityCalculator_jar/javaComplexityCalculator.jar',
	)
	.replace('dist', 'src');

java.classpath.push(fullClassPath);
const App: { calculateJavaComplexitySync(filepath: string): TFileComplexity } = java.import('ComplexityCalculator.App');
const calculateJavaCompĺexity = (filepath: string): TFileComplexity => {
	const result = App.calculateJavaComplexitySync(filepath);

	return result;
};

export default calculateJavaCompĺexity;
