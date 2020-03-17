'use strict';

import fs from 'fs';

import DomParser from 'dom-parser';

const calculateHtmlComplexity = (filepath: string): TFileComplexity => {

    if (!fs.existsSync(filepath)) return 'BAIXA';

    const htmlFileString = fs.readFileSync(filepath, 'utf8');
    const parser = new DomParser();
    const htmlDomObject = parser.parseFromString(htmlFileString);

    // TODO: Implement rules

    return 'BAIXA';
};

export default calculateHtmlComplexity;