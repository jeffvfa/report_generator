package ComplexityCalculator;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

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
        String filePath = "src/examples/example8.txt";
        calculateJavaComplexity(filePath);
    }
    private static String readLineByLineJava8(String filePath)
    {
        StringBuilder contentBuilder = new StringBuilder();

        try (Stream<String> stream = Files.lines( Paths.get(filePath), StandardCharsets.UTF_8))
        {
            stream.forEach(s -> contentBuilder.append(s).append("\n"));
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }

        return contentBuilder.toString();
    }
    public static String calculateJavaComplexity(String filePath) {
        String fileCode = null;
        try {
            fileCode = readLineByLineJava8(filePath);
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
        List<String> utilizedOperations = new ArrayList<>();
        for (FieldDeclaration field : compilationUnit.findAll(FieldDeclaration.class)) {
            numOfVariables++;
            String dlc = field.toString().toUpperCase();
            if (dlc.contains("@INJECT") && dlc.contains("OPERACAO")) {
                String[] l = dlc.split(" ");
                String operation = l[l.length - 1].replace(";", "");
                utilizedOperations.add(operation);
            }

        }

        // Count API expositions
        for (MethodDeclaration m : compilationUnit.findAll(MethodDeclaration.class)) {
            String dlc = m.toString().toUpperCase();
            if (dlc.contains("@PATH"))
                numOfApiExpositions++;
        }

        // Count Object IIB calls and Files
        for (MethodCallExpr m : compilationUnit.findAll(MethodCallExpr.class)) {
            String dlc = m.toString().toUpperCase();
            if (dlc.contains("GETRESPOSTA()"))
                numOfIIBCalls++;

            for (String s : utilizedOperations) {
                if (dlc.contains((s + ".").replace(" ", ""))) {
                    numOfIIBCalls++;
                    break;
                }
            }
            if (dlc.contains("FILES")
                    || dlc.contains("NEW FILE")
                    || dlc.contains("NEW FILEINPUTSTREAM")
                    || dlc.contains("NEW FILEREADER")
                    || dlc.contains("NEW RANDOMACCESSFILE"))
                numOfOpenedFiles++;
        }

        long totalComplexity = (numOfVariables / 5) + numOfApiExpositions + numOfIIBCalls + numOfOpenedFiles;
//        System.out.println("numOfVariables: " + numOfVariables);
//        System.out.println("numOfApiExpositions: " + numOfApiExpositions);
//        System.out.println("numOfIIBCalls: " + numOfIIBCalls);
//        System.out.println("numOfOpenedFiles: " + numOfOpenedFiles);
//        System.out.println("File and Total complexity: " + filePath + " -> " + totalComplexity);

        if (totalComplexity <= 15)
            return "BAIXA";
        if (totalComplexity <= 30)
            return "MEDIA";
        if (totalComplexity <= 50)
            return "ALTA";
        return "MUITO ALTA";
    }
}
