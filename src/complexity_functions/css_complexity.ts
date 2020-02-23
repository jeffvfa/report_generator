import fs from 'fs';

/**
 * it receives a path to a css file and calculate the file's complexity
 * @param FILE_PATH A path to a file
 */
export default function calculateCSSComplexity(FILE_PATH: string): TFileComplexity {
    let css_file = fs.readFileSync(FILE_PATH, 'utf8');

    let quantity_of_objects = css_file.split('}').length - 1;

    if (quantity_of_objects < 30) {
        return 'BAIXA';
    }
    else if (quantity_of_objects > 30 && quantity_of_objects < 60) {
        return 'MEDIA';
    }
    else {
        return 'ALTA';
    }
}
