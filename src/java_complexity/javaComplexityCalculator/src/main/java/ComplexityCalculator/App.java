package ComplexityCalculator;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import com.github.javaparser.StaticJavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.body.FieldDeclaration;
import com.github.javaparser.ast.body.MethodDeclaration;
import com.github.javaparser.ast.expr.MethodCallExpr;
import com.github.javaparser.ast.expr.VariableDeclarationExpr;

/**
 * App!
 */
public class App {
    public static void main(String[] args) throws IOException {
        String filePath = "./src/examples/example5.txt";
        calculateJavaComplexity(filePath);
    }

    public static String calculateJavaComplexity(String filePath) {
        String fileCode = null;
        try {
            fileCode = Files.readString(Paths.get(filePath), StandardCharsets.UTF_8);
        } catch (Exception err) {
            return "BAIXA";
        }

        // Parse code
        CompilationUnit compilationUnit = StaticJavaParser.parse(fileCode);
        long numOfVariables = 0;
        long numOfApiExpositions = 0;
        long numOfIIBCalls = 0;
        long numOfOpenedFiles = 0;

        // Count number of variables
        numOfVariables += compilationUnit.findAll(VariableDeclarationExpr.class).stream().count();
        numOfVariables += compilationUnit.findAll(FieldDeclaration.class).stream().count();

        // Count API expositions
        for (MethodDeclaration m : compilationUnit.findAll(MethodDeclaration.class)) {
            String dlc = m.toString();
            if (dlc.toUpperCase().contains("@PATH"))
                numOfApiExpositions++;
        }

        // Count Object IIB calls and Files
        for (MethodCallExpr m : compilationUnit.findAll(MethodCallExpr.class)) {
            String dlc = m.toString();
            if (dlc.toUpperCase().contains("GETRESPOSTA()"))
                numOfIIBCalls++;
            if (dlc.toUpperCase().contains("FILES")
                || dlc.toUpperCase().contains("NEW FILE")
                || dlc.toUpperCase().contains("NEW FILEINPUTSTREAM")
                || dlc.toUpperCase().contains("NEW FILEREADER")
                || dlc.toUpperCase().contains("NEW RANDOMACCESSFILE"))
                numOfOpenedFiles++;
        }

        long totalComplexity = (numOfVariables / 5) + numOfApiExpositions + numOfIIBCalls + numOfOpenedFiles;
        System.out.println("File and Total complexity: " + filePath + " -> " + totalComplexity);

        if (totalComplexity <= 15)
            return "BAIXA";
        if (totalComplexity <= 30)
            return "MEDIA";
        if (totalComplexity <= 50)
            return "ALTA";
        return "MUITO ALTA";
    }
}
