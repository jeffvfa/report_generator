'use strict';

import * as calculator from '../../src/complexity_functions/key-value_complexity';

describe('=> Key-Value Complexity Test Suite', () => {
    it('Imports Should be defined', () => {
        expect(calculator.calculateKeyValueComplexity).toBeDefined();
        expect(calculator.calculateXmlComplexity).toBeDefined();
        expect(calculator.calculateJsonComplexity).toBeDefined();
    });

    describe('=> calculateXmlComplexity', () => {
        it('-> Complexity should be BAIXA (Inexistent file, XML case)', () => {
            // Setup
            const filepath = './tests/complexity_functions/key-velue_mock_test_files/nonExistentFile.txt';

            // Action
            const result = calculator.calculateXmlComplexity(filepath);

            // Verify
            expect(result).toBe('BAIXA');
        });

        it('-> Complexity should be BAIXA (XML case)', () => {
            // Setup
            const filepath = './tests/complexity_functions/key-velue_mock_test_files/test_file_for_xml_complexity_baixa.txt';

            // Action
            const result = calculator.calculateXmlComplexity(filepath);

            // Verify
            expect(result).toBe('BAIXA');
        });

        it('-> Complexity should be MEDIA (XML case)', () => {
            // Setup
            const filepath = './tests/complexity_functions/key-velue_mock_test_files/test_file_for_xml_complexity_media.txt';

            // Action
            const result = calculator.calculateXmlComplexity(filepath);

            // Verify
            expect(result).toBe('MEDIA');
        });

        it('-> Complexity should be ALTA (XML case)', () => {
            // Setup
            const filepath = './tests/complexity_functions/key-velue_mock_test_files/test_file_for_xml_complexity_alta.txt';

            // Action
            const result = calculator.calculateXmlComplexity(filepath);

            // Verify
            expect(result).toBe('ALTA');
        });
    });

    describe('=> calculateJsonComplexity', () => {
        
        it('-> Complexity should be BAIXA (Inexistent file, JSON case)', () => {
            // Setup
            const filepath = './tests/complexity_functions/key-velue_mock_test_files/nonExistentFile.txt';

            // Action
            const result = calculator.calculateJsonComplexity(filepath);

            // Verify
            expect(result).toBe('BAIXA');
        });

        it('-> Complexity should be BAIXA (JSON case)', () => {
            // Setup
            const filepath = './tests/complexity_functions/key-velue_mock_test_files/test_file_for_json_complexity_baixa.txt';

            // Action
            const result = calculator.calculateJsonComplexity(filepath);

            // Verify
            expect(result).toBe('BAIXA');
        });

        it('-> Complexity should be MEDIA (JSON case)', () => {
            // Setup
            const filepath = './tests/complexity_functions/key-velue_mock_test_files/test_file_for_json_complexity_media.txt';

            // Action
            const result = calculator.calculateJsonComplexity(filepath);

            // Verify
            expect(result).toBe('MEDIA');
        });

        it('-> Complexity should be ALTA (JSON case)', () => {
            // Setup
            const filepath = './tests/complexity_functions/key-velue_mock_test_files/test_file_for_json_complexity_alta.txt';

            // Action
            const result = calculator.calculateJsonComplexity(filepath);

            // Verify
            expect(result).toBe('ALTA');
        });
    });

    describe('=> calculateKeyValueComplexity', () => {
        
        it('-> Complexity should be BAIXA (Inexistent file, any case)', () => {
            // Setup
            const filepath = '';

            // Action
            const result = calculator.calculateKeyValueComplexity(filepath);

            // Verify
            expect(result).toBe('BAIXA');
        });

        it('-> Should call adequate function (XML case)', () => {
            // Setup
            spyOn(calculator, 'calculateXmlComplexity').and.callThrough;
            const filepath = './tests/complexity_functions/key-velue_mock_test_files/test_file_for_xml_complexity_sample.xml';

            // Action
            calculator.calculateKeyValueComplexity(filepath);

            // Verify
            expect(calculator.calculateXmlComplexity).toHaveBeenCalled();
        });

        it('-> Should call adequate function (JSON case)', () => {
            // Setup
            spyOn(calculator, 'calculateJsonComplexity').and.callThrough;
            const filepath = './tests/complexity_functions/key-velue_mock_test_files/test_file_for_json_complexity_sample.json';

            // Action
            calculator.calculateKeyValueComplexity(filepath);

            // Verify
            expect(calculator.calculateJsonComplexity).toHaveBeenCalled();
        });

        it('-> Should not call any function (JSON and XML cases)', () => {
            // Setup
            spyOn(calculator, 'calculateJsonComplexity').and.callThrough();
            spyOn(calculator, 'calculateXmlComplexity').and.callThrough();
            const filepath = './tests/complexity_functions/key-velue_mock_test_files/test_file_for_json_complexity_sample.txt';

            // Action
            calculator.calculateKeyValueComplexity(filepath);

            // Verify
            expect(calculator.calculateJsonComplexity).not.toHaveBeenCalled();
            expect(calculator.calculateXmlComplexity).not.toHaveBeenCalled();
        });
    });
});