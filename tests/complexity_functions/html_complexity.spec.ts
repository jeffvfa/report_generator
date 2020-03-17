'use strict';

import calculateHtmlComplexity from '../../src/complexity_functions/html_complexity';

describe('=> Html Complexity Test Suite', () => {
    it('-> Import Should Be Definde', () => {
        expect(calculateHtmlComplexity).toBeDefined();
    });
});