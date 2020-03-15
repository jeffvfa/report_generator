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
            const result = calculateXmlComplexity(filepath);

            // Verify
            expect(result).toBe('BAIXA');
        });

        it('-> Complexity should be MEDIA (XML case)', () => {
            // Setup
            const filepath = './tests/complexity_functions/key-velue_mock_test_files/test_file_for_xml_complexity_media.txt';

            // Action
            const result = calculateXmlComplexity(filepath);

            // Verify
            expect(result).toBe('MEDIA');
        });

        it('-> Complexity should be ALTA (XML case)', () => {
            // Setup
            const filepath = './tests/complexity_functions/key-velue_mock_test_files/test_file_for_xml_complexity_alta.txt';

            // Action
            const result = calculateXmlComplexity(filepath);

            // Verify
            expect(result).toBe('ALTA');
        });
    });
});