package java_backend.utils;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class BcryptUtil {

    public static String hashString(String string) {
        return BCrypt.hashpw(string, BCrypt.gensalt(10));
    }

    public static boolean checkString(String string, String hashedString) {
        return BCrypt.checkpw(string, hashedString);
    }
}
