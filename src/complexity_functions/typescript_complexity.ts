'use strict';
import fs from 'fs';
import ts from 'typescript';

/**
 * it receives a path to a typescript file and calculate the file's complexity
 * @param FILE_PATH A path to a file
 */
export default function calculateTypescriptComplexity(FILE_PATH: string): TFileComplexity {

    let numOfFunctions = 0;
    const delintNode = (node: ts.Node) => {
        switch (node.kind) {
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionKeyword:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                numOfFunctions += 1;
        }
        ts.forEachChild(node, delintNode);
    };

    // Esta linha eh somente para propositos de teste
    if (!fs.existsSync(FILE_PATH)) return 'BAIXA';
    
    const sourceFile = ts.createSourceFile(
        FILE_PATH,
        fs.readFileSync(FILE_PATH).toString(),
        ts.ScriptTarget.ES2015,
        true
    );

    delintNode(sourceFile);

    if(numOfFunctions > 20) return 'ALTA';
    if(numOfFunctions > 10) return 'MEDIA';
    return 'BAIXA';
};
