import calculateCssComplexity from '../../src/complexity_functions/css_complexity';

describe('=> Css Complexity Test Suite', () => {
	it('-> Import Should be defined', () => {
		expect(calculateCssComplexity).toBeDefined();
	});

	it('-> Complexity Should Be BAIXA (Inexistent file, any case)', () => {
		// Setup
		const filename = './spec/complexity_functions/css_mock_test_files/nonExistentFile.txt';

		// Action
		const complexity = calculateCssComplexity(filename);

		// Verify
		expect(complexity).toBe('BAIXA');
	});

	it('-> Complexity Should Be BAIXA', () => {
		// Setup
		const filename = './spec/complexity_functions/css_mock_test_files/test_file_for_css_complexity_baixa.txt';

		// Action
		const complexity = calculateCssComplexity(filename);

		// Verify
		expect(complexity).toBe('BAIXA');
	});

	it('-> Complexity Should Be MEDIA', () => {
		// Setup
		const filename = './spec/complexity_functions/css_mock_test_files/test_file_for_css_complexity_media.txt';

		// Action
		const complexity = calculateCssComplexity(filename);

		// Verify
		expect(complexity).toBe('MEDIA');
	});

	it('-> Complexity Should Be ALTA', () => {
		// Setup
		const filename = './spec/complexity_functions/css_mock_test_files/test_file_for_css_complexity_alta.txt';

		// Action
		const complexity = calculateCssComplexity(filename);

		// Verify
		expect(complexity).toBe('ALTA');
	});
});
