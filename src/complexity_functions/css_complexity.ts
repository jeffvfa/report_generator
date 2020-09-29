'use strict';
import fs from 'fs';
import css from 'css';

/**
 * it receives a path to a css file and calculate the file's complexity
 * @param filepath A path to a file
 */
const calculateCSSComplexity = (filepath: string): TFileComplexity => {
	// if (!fs.existsSync(FILE_PATH)) return null;

	// Esta linha eh somente para propositos de teste
	if (!fs.existsSync(filepath)) return 'BAIXA';
	let css_file = fs.readFileSync(filepath, 'utf8');

	let quantity_of_objects = 0;
	try {
		const cssObj = css.parse(css_file);
		quantity_of_objects = cssObj.stylesheet?.rules.length || 0;
	} catch (err) {
		console.log('failed to parse file: ' + filepath);
	}

	if (quantity_of_objects > 60) return 'ALTA';
	if (quantity_of_objects > 30) return 'MEDIA';
	return 'BAIXA';
};

export default calculateCSSComplexity;
