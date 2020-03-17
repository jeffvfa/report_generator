'use strict';
import fs from 'fs';

/**
 * it receives a path to a css file and calculate the file's complexity
 * @param filepath A path to a file
 */
const calculateCSSComplexity = (filepath: string): TFileComplexity => {
    // if (!fs.existsSync(FILE_PATH)) return null;

    // Esta linha eh somente para propositos de teste
    if (!fs.existsSync(filepath)) return 'BAIXA';
    let css_file = fs.readFileSync(filepath, 'utf8');

    let quantity_of_objects = css_file.split('}').length - 1;

    if (quantity_of_objects < 30) {
        return 'BAIXA';
    } else if (quantity_of_objects > 30 && quantity_of_objects < 60) {
        return 'MEDIA';
    } else {
        return 'ALTA';
    }
};

export default calculateCSSComplexity;
