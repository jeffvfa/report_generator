import calculateCSSComplexity from './css_complexity';
import calculateKarmaComplexity from './karma_complexity';

export default (function (): TComplexityCalculator {
    const unimplementedComplexity = (str: string): TFileComplexity => 'BAIXA';
    let complexityCalculator: TComplexityCalculator = {};

    complexityCalculator['TEST'] = calculateKarmaComplexity;

    complexityCalculator['JAVA'] = unimplementedComplexity;

    complexityCalculator['JAVASCRIPT'] = unimplementedComplexity;

    complexityCalculator['KEY_VALUE'] = unimplementedComplexity;

    complexityCalculator['CSS'] = calculateCSSComplexity;

    complexityCalculator['HTML'] = unimplementedComplexity;

    complexityCalculator['SCALA'] = unimplementedComplexity;

    complexityCalculator['OUTRO'] = unimplementedComplexity;

    return complexityCalculator;
})();