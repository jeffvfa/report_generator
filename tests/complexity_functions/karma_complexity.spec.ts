import calculateKarmaComplexity from '../../src/complexity_functions/karma_complexity';

describe('=> Karma Complexity Test Suite', () => {
    it('-> import should be defined', () => {
        expect(calculateKarmaComplexity).toBeDefined();
    });

    it('-> Complexity Should Be BAIXA', () => {
        // Setup
        const filename = './test_file_for_karma_complexity_baixa.txt';

        // Action
        const complexity = calculateKarmaComplexity(filename);

        // Verify
        expect(complexity).toBe('BAIXA');
    });
});