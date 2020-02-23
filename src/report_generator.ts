import calculateCSSComplexity from './complexity_functions/css_complexity';
import karma_complexity from './complexity_functions/karma_complexity';
import fs from 'fs';
import {arrayUnique} from './helpers/Array.helper';

'use strict';
namespace report_generator {

    const retrieveCategoryFromFile = (filePath: string): TFileCategory | undefined => {
        //if (!filePath) throw new Error('No File Path Available');
        if (!filePath) return undefined;

        // recupera somente o nome e a extensão do arquivo.
        const fileName = String(filePath.split('\\').pop()!.split('/').pop());

        // Categorias possiveis: test, js, html, css, java, key-value, scala
        if (fileName.includes('spec') && (fileName.includes('.js') || fileName.includes('.ts'))) return 'TEST';
        else if (fileName.includes('Test')) return 'TEST';
        else if (fileName.includes('.java')) return 'JAVA';
        else if (fileName.includes('.js') || fileName.includes('.ts')) return 'JAVASCRIPT';
        else if (fileName.includes('.xml') || fileName.includes('.json')) return 'KEY_VALUE';
        else if (fileName.includes('.css')) return 'CSS';
        else if (fileName.includes('.html')) return 'HTML';
        else if (fileName.includes('.scala')) return 'SCALA';
        return 'OUTRO';
    };

    const buildFileObjects = (y: IGitLogOutput, projectPath: string): TFileProperties[] => {
        return (y.files || [])
            // remove renamed files
            .filter(el => el.split(' ')[0][0] !== 'R')
            // build file object
            .map(el => {
                let elSplited = el.split(' ');
                const filePath = projectPath + elSplited[1];
                return {
                    diffType: elSplited[0],
                    filePath,
                    category: retrieveCategoryFromFile(filePath),
                    complexity: null
                } as TFileProperties
            });
    };

    const formatCommitsToTaskList = (commits: IGitLogOutput[]) => {
        return commits.reduce<TTaskProperties>((acc, y) => {
            let task = y.message.substr(5, 7);
            const projectPath = y.directory;
            acc[task] = acc[task] || [];
            acc[task] = arrayUnique(acc[task].concat(buildFileObjects(y, projectPath)));
            return acc
        }, {});
    };

    const main = (): void => {
        console.log("Iniciando Report Generator");

        // let rawdata = fs.readFileSync('output/gitlog0.json', 'utf8');
        console.log("Iniciando Parse Arquivo gitlog.json");
        let rawdata = fs.readFileSync('gitlog.json', 'utf8');
        rawdata = rawdata.replace(/\s/g, ' ');
        const commits: IGitLogOutput[] = JSON.parse(rawdata);
        console.log("Parse realizado com sucesso!!!");

        console.log(JSON.stringify(formatCommitsToTaskList(commits), null, '\t'));
    };

    main();
}
