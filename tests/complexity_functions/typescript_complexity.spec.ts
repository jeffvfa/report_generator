'use strict';

import calculateTypescriptComplexity from '../../src/complexity_functions/typescript_complexity';

describe('=> Typescript Complexity Test Suite', () => {
    it('-> Import Should be defined', () => {
        expect(calculateTypescriptComplexity).toBeDefined();
    });

    it('-> Complexity Should Be BAIXA (typescript)', () => {
        // Setup
        const filename = './tests/complexity_functions/typescript_mock_test_files/test_file_for_typescript_complexity_baixa.txt';
        
        // Action
        const complexity = calculateTypescriptComplexity(filename);
        
        // Verify
        expect(complexity).toBe('BAIXA');
    });

    it('-> Complexity Should Be MEDIA (typescript)', () => {
        // Setup
        const filename = './tests/complexity_functions/typescript_mock_test_files/test_file_for_typescript_complexity_media.txt';
        
        // Action
        const complexity = calculateTypescriptComplexity(filename);
        
        // Verify
        expect(complexity).toBe('MEDIA');
    });

    it('-> Complexity Should Be ALTA (typescript)', () => {
        // Setup
        const filename = './tests/complexity_functions/typescript_mock_test_files/test_file_for_typescript_complexity_alta.txt';
        
        // Action
        const complexity = calculateTypescriptComplexity(filename);
        
        // Verify
        expect(complexity).toBe('ALTA');
    });


    it('-> Complexity Should Be BAIXA (javascript)', () => {
        // Setup
        const filename = './tests/complexity_functions/javascript_mock_test_files/test_file_for_javascript_complexity_baixa.txt';
        
        // Action
        const complexity = calculateTypescriptComplexity(filename);
        
        // Verify
        expect(complexity).toBe('BAIXA');
    });

    it('-> Complexity Should Be MEDIA (javascript)', () => {
        // Setup
        const filename = './tests/complexity_functions/javascript_mock_test_files/test_file_for_javascript_complexity_media.txt';
        
        // Action
        const complexity = calculateTypescriptComplexity(filename);
        
        // Verify
        expect(complexity).toBe('MEDIA');
    });

    it('-> Complexity Should Be ALTA (javascript)', () => {
        // Setup
        const filename = './tests/complexity_functions/javascript_mock_test_files/test_file_for_javascript_complexity_alta.txt';
        
        // Action
        const complexity = calculateTypescriptComplexity(filename);
        
        // Verify
        expect(complexity).toBe('ALTA');
    });
});