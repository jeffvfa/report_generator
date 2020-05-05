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
import com.github.javaparser.symbolsolver.resolution.typeinference.Instantiation;

import org.checkerframework.common.reflection.qual.NewInstance;

import javassist.expr.MethodCall;

/**
 * App!
 *
 */
public class App {
    public String testfieldDecl;

    public static void main(String[] args) throws IOException {
        String filePath = "./javaComplexityCalculator/src/examples/example5.txt";
        calculateJavaComplexity(filePath);
    }

    private static String calculateJavaComplexity(String filePath) throws IOException {
        String fileCode = null;
        try {
            fileCode = Files.readString(Paths.get(filePath), StandardCharsets.UTF_8);
        } catch (Exception err) {
            System.out.println(err.getMessage());
            return null;
        }

        // Parse code
        CompilationUnit compilationUnit = StaticJavaParser.parse(fileCode);
        long numOfVariables = 0;
        long numOfApiExpositions = 0;
        long numOfIIBCalls = 0;

        // Count number of variables
        numOfVariables += compilationUnit.findAll(VariableDeclarationExpr.class).stream().count();
        numOfVariables += compilationUnit.findAll(FieldDeclaration.class).stream().count();

        // Count API expositions
        for (MethodDeclaration m : compilationUnit.findAll(MethodDeclaration.class)) {
            String dlc = m.toString();
            if (dlc.toUpperCase().contains("@PATH"))
                numOfApiExpositions++;
        }

        // Count Object IIB calls
        for (MethodCallExpr m : compilationUnit.findAll(MethodCallExpr.class)) {
            String dlc = m.toString();
            if (dlc.toUpperCase().contains("GETRESPOSTA()"))
                numOfIIBCalls++;
        }

        System.out.println("Num of variables: " + numOfVariables);
        System.out.println("Num of API expositions: " + numOfApiExpositions);
        System.out.println("Num of IIB calls: " + numOfIIBCalls);
        return null;
    }
}
