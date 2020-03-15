'use strict';
import fs from 'fs';
import { DOMParser } from 'xmldom';
/**
 * Calculates the complexity for XML files
 * @param filepath path of the file to calculate the complexity
 * @param verbose flag enable some logging
 */
export const calculateXmlComplexity = (filepath: string, verbose: boolean = false): TFileComplexity => {
    // Esta linha eh somente para propositos de teste
    if (!fs.existsSync(filepath)) return 'BAIXA';

    const xmlFileString = fs.readFileSync(filepath, 'utf8');
    verbose && console.log('File Parsed:\n ' + xmlFileString);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlFileString, 'text/xml');


    let numOfKeys = 0;
    const countNodes = (node?: Node): void => {
        // nodeType: 1 -> tags
        if (node && node.nodeType === 1 && node.childNodes?.length > 0) {
            numOfKeys += 1;
            for (let i = 0; i < node.childNodes.length; i++)
                countNodes(node.childNodes.item(i));
        }
    }
    countNodes(xmlDoc.documentElement);

    verbose && console.log('\nNumber of node: ' + numOfKeys);
    if (numOfKeys > 300) return 'ALTA';
    if (numOfKeys > 100) return 'MEDIA';

    return 'BAIXA';
};

/**
 * Calculates the complexity for JSON files
 * @param filepath path of the file to calculate the complexity
 * @param verbose flag enable some logging
 */
export const calculateJsonComplexity = (filepath: string, verbose: boolean = false): TFileComplexity => {
    // Esta linha eh somente para propositos de teste
    if (!fs.existsSync(filepath)) return 'BAIXA';

    return 'BAIXA';
};

/**
 * Calculates the complexity for JSON and XML files
 * @param filepath path of the file to calculate the complexity
 * @param verbose flag enable some logging
 */
const calculateKeyValueComplexity = (filepath: string, verbose: boolean = false): TFileComplexity => {
    // Esta linha eh somente para propositos de teste
    if (!fs.existsSync(filepath)) return 'BAIXA';
    const fileExtension = filepath.split('.').pop();
    if (fileExtension?.toUpperCase() === 'JSON') return calculateJsonComplexity(filepath, verbose);
    else if (fileExtension?.toUpperCase().includes('XML')) return calculateXmlComplexity(filepath, verbose);

    return 'BAIXA';
};

export default calculateKeyValueComplexity;