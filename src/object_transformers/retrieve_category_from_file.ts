'use strict';

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

export default retrieveCategoryFromFile;