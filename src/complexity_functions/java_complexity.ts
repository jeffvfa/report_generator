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
let App: { calculateJavaComplexitySync(filepath: string): TFileComplexity } | null = null;
try {
	App = java.import('ComplexityCalculator.App');
} catch (err) {
	console.log(err);
}
const calculateJavaCompĺexity = (filepath: string): TFileComplexity => {
	try {
		const result = App?.calculateJavaComplexitySync(filepath);

		return result || 'BAIXA';
	} catch (err) {
		return 'BAIXA';
	}
};

export default calculateJavaCompĺexity;
