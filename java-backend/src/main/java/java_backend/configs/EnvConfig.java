package java_backend.configs;

public final class EnvConfig {

    // Private constructor to prevent instantiation
    private EnvConfig() {
        throw new AssertionError("This class should not be instantiated");
    }

    public static String getenvvar(String key) {
        return System.getProperty(key, System.getenv(key));
    }

}