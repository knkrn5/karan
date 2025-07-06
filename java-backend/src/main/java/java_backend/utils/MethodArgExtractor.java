package java_backend.utils;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.reflect.MethodSignature;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class MethodArgExtractor {

    private MethodArgExtractor() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    public static Object extractParam(JoinPoint joinPoint, String paramName) {

        if (joinPoint == null) {
            return "JoinPoint is null";
        }
        if (paramName == null || paramName.trim().isEmpty()) {
            return "paramName is null";
        }

        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        String[] paramNames = signature.getParameterNames();
        Object[] args = joinPoint.getArgs();

        for (int i = 0; i < args.length; i++) {
            Object arg = args[i];
            String name = paramNames[i];

            // 1. Extracting exact match of parameter name
            if (paramName.equals(name)) {
                return arg;
            }

            // 2. Checking if the param is a DTO with a field named 'key'
            if (arg != null) {
                // Here we are directly accessing the field by name using getDeclaredField
                try {
                    // get.class() this gives us the access of all the fields/methods of class
                    Field field = arg.getClass().getDeclaredField(paramName);
                    field.setAccessible(true);
                    return field.get(arg);
                } catch (NoSuchFieldException | IllegalAccessException e) {
                    System.err.println("Reflection Feild access error: " + e.getMessage());
                }

                // here we are trying to access the field using a getter method: getKey()
                try {
                    // In the below line, we are constructing the getter method name dynamically
                    String methodName = "get" + paramName.substring(0, 1).toUpperCase() + paramName.substring(1);
                    Method method = arg.getClass().getMethod(methodName);
                    return method.invoke(arg);
                } catch (Exception e) {
                    System.err.println("Reflection getter Method failed: " + e.getMessage());
                }
            }
        }

        return null;
    }
}
