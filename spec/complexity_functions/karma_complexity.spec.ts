'use strict';


import calculateKarmaComplexity from '../../src/complexity_functions/karma_complexity';

describe('=> Karma Complexity Test Suite', () => {
    it('-> import should be defined', () => {
        expect(calculateKarmaComplexity).toBeDefined();
    });

    it('-> Complexity Should Be BAIXA for missing files', () => {
        // Setup
        const filename = './spec/complexity_functions/karma_mock_test_files/file_that_does_not_exists.txt';

        // Action
        const complexity = calculateKarmaComplexity(filename);

        // Verify
        expect(complexity).toBe('BAIXA');
    });

    it('-> Complexity Should Be BAIXA', () => {
        // Setup
        const filename = './spec/complexity_functions/karma_mock_test_files/test_file_for_karma_complexity_baixa.txt';

        // Action
        const complexity = calculateKarmaComplexity(filename);

        // Verify
        expect(complexity).toBe('BAIXA');
    });

    it('-> Complexity Should Be MEDIA', () => {
        // Setup
        const filename = './spec/complexity_functions/karma_mock_test_files/test_file_for_karma_complexity_media.txt';

        // Action
        const complexity = calculateKarmaComplexity(filename);

        // Verify
        expect(complexity).toBe('MEDIA');
    });

    it('-> Complexity Should Be ALTA', () => {
        // Setup
        const filename = './spec/complexity_functions/karma_mock_test_files/test_file_for_karma_complexity_alta.txt';

        // Action
        const complexity = calculateKarmaComplexity(filename);

        // Verify
        expect(complexity).toBe('ALTA');
    });
});
