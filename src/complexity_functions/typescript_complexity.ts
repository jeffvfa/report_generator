'use strict';
import fs from 'fs';
import ts from 'typescript';

/**
 * it receives a path to a typescript file and calculate the file's complexity
 * @param filepath A path to a file
 */
const calculateTypescriptComplexity = (filepath: string): TFileComplexity => {

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
			case ts.SyntaxKind.JsxElement:
			case ts.SyntaxKind.JsxSelfClosingElement:
				numOfFunctions += 1;
		}
        ts.forEachChild(node, delintNode);
    };

    // Esta linha eh somente para propositos de teste
    if (!fs.existsSync(filepath)) return 'BAIXA';

    const sourceFile = ts.createSourceFile(
		filepath,
		fs.readFileSync(filepath).toString(),
		ts.ScriptTarget.ES2015,
		true,
		4 // JSX
	);

    delintNode(sourceFile);
    console.log('Number of functions: ' + numOfFunctions);
    if(numOfFunctions > 20) return 'ALTA';
    if(numOfFunctions > 10) return 'MEDIA';
    return 'BAIXA';
};

export default calculateTypescriptComplexity;
