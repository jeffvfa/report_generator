'use strict';

import calculateKeyValueComplexity, { calculateXmlComplexity, calculateJsonComplexity } from '../../src/complexity_functions/key-value_complexity';

describe('=> Key-Value Complexity Test Suite', () => {
    it('Imports Should be defined', () => {
        expect(calculateKeyValueComplexity).toBeDefined();
        expect(calculateXmlComplexity).toBeDefined();
        expect(calculateJsonComplexity).toBeDefined();
    });

    describe('=> calculateXmlComplexity', () => {
        it('-> Complexity should be BAIXA (XML case)', () => {
            // Setup
            const filepath = './tests/complexity_functions/key-velue_mock_test_files/test_file_for_xml_complexity_baixa.txt';

            // Action
            const result = calculateXmlComplexity(filepath, true);

            // Verify
            expect(result).toBe('BAIXA');
        });
    });
});