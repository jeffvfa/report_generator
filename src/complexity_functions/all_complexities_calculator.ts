import calculateCSSComplexity from './css_complexity';
import calculateKarmaComplexity from './karma_complexity';
import calculateTypescriptComplexity from './typescript_complexity';
import calculateKeyValueComplexity from './key-value_complexity';

const unimplementedComplexity = (_: string): TFileComplexity => 'BAIXA';

let complexityCalculator: TComplexityCalculator = {};

complexityCalculator['TEST'] = calculateKarmaComplexity; // TODO: TEST can be either karma or java, so this line is incomplete

complexityCalculator['JAVA'] = unimplementedComplexity;

complexityCalculator['JAVASCRIPT'] = calculateTypescriptComplexity; // Works for both typescript and javascript

complexityCalculator['KEY_VALUE'] = calculateKeyValueComplexity; // Workd for both XML and JSON

complexityCalculator['CSS'] = calculateCSSComplexity;

complexityCalculator['HTML'] = unimplementedComplexity;

complexityCalculator['SCALA'] = unimplementedComplexity;

complexityCalculator['OUTRO'] = unimplementedComplexity;

export default complexityCalculator;