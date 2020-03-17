'use strict';
import fs from 'fs';
import { DOMParser } from 'xmldom';

/**
 * Calculates the complexity for XML files
 * @param filepath path of the file to calculate the complexity
 * @param verbose flag enable some logging
 */
export const calculateXmlComplexity = (filepath: string, verbose: boolean = false): TFileComplexity => {

    if (!fs.existsSync(filepath)) return 'BAIXA';

    const xmlFileString = fs.readFileSync(filepath, 'utf8');
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

    if (numOfKeys > 300) return 'ALTA';
    if (numOfKeys > 100) return 'MEDIA';

    return 'BAIXA';
};

/**
 * Calculates the complexity for JSON files
 * @param filepath path of the file to calculate the complexity
 * @param verbose flag enable some logging
 */
export const calculateJsonComplexity = (filepath: string): TFileComplexity => {

    if (!fs.existsSync(filepath)) return 'BAIXA';

    const jsonFileString = fs.readFileSync(filepath, 'utf8');

    let jsonFileObject: any = null;
    try {
        jsonFileObject = JSON.parse(jsonFileString);
    } catch (err) {
        console.log(err);
        console.log('filepath: ' + filepath);
        console.log('================================================================\n\n');
        console.log(jsonFileString);
        console.log('================================================================\n\n');
        return 'BAIXA';
    }


    let count: number[] = [];
    const getCount = (data: any, level: number): void => {
        level = level || 0;
        count[level] = count[level] || 0;
        for (var k in data) {
            data.hasOwnProperty(k) && count[level]++;
            typeof data[k] === 'object' && getCount(data[k], level + 1);
        }
    }

    getCount(jsonFileObject, 0);
    const numOfKeys = count.reduce((prev, el) => prev + el, 0);

    if (numOfKeys > 300) return 'ALTA';
    if (numOfKeys > 100) return 'MEDIA';

    return 'BAIXA';
};

/**
 * Calculates the complexity for JSON and XML files
 * @param filepath path of the file to calculate the complexity
 * @param verbose flag enable some logging
 */
export const calculateKeyValueComplexity = (filepath: string): TFileComplexity => {

    if (!filepath) return 'BAIXA';
    const fileExtension = filepath.split('.')?.pop();
    if (fileExtension?.toUpperCase() === 'JSON') return calculateJsonComplexity(filepath);
    else if (fileExtension?.toUpperCase().includes('XML')) return calculateXmlComplexity(filepath);

    return 'BAIXA';
};

export default calculateKeyValueComplexity;