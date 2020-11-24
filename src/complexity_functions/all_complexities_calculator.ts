import calculateCSSComplexity from './css_complexity';
import calculateTypescriptComplexity from './typescript_complexity';
import calculateKeyValueComplexity from './key-value_complexity';
import calculateJavaCompĺexity from './java_complexity';

const unimplementedComplexity = (_: string): TFileComplexity => 'BAIXA';

let complexityCalculator: TComplexityCalculator = {};

complexityCalculator['TEST'] = unimplementedComplexity; // All tests are the same now

complexityCalculator['JAVA'] = unimplementedComplexity;

complexityCalculator['JAVASCRIPT'] = unimplementedComplexity; // Works for both typescript and javascript

complexityCalculator['KEY_VALUE'] = unimplementedComplexity; // Workd for both XML and JSON

complexityCalculator['CSS'] = calculateCSSComplexity;

complexityCalculator['HTML'] = unimplementedComplexity;

complexityCalculator['SCALA'] = unimplementedComplexity;

complexityCalculator['OUTRO'] = unimplementedComplexity;

export default complexityCalculator;
