package java_backend.utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java_backend.configs.EnvConfig;

// import static java_backend.configs.EnvConfig.dotenv;

public class CookieUtil {

    private CookieUtil() {
        throw new AssertionError("Utility class should not be instantiated");
    }

    // add cookie utility method
    public static void addCookie(String cookieName, String cookieValue, int cookieTimePeriod,
            HttpServletResponse httpResponse) {
        Cookie cookie = new Cookie(cookieName, cookieValue);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        if ("PRODUCTION".equalsIgnoreCase(EnvConfig.getenvvar("ENV"))) {
            cookie.setDomain(".karan.email");
            cookie.setSecure(true);
        }
        cookie.setMaxAge(cookieTimePeriod);
        httpResponse.addCookie(cookie);
    }

    // get cookie utility method
    public static String getCookie(String cookieName, HttpServletRequest request) {
        String cookieValue = null;
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            // for-each loop in java
            for (Cookie cookie : cookies) {
                if (cookieName.equals(cookie.getName())) {
                    cookieValue = cookie.getValue();
                    break;
                }
            }
            return cookieValue;
        } else {
            return null;
        }
    }

    // remove cookie utility method
    public static void removeCookie(String cookieName, HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {

        // Checking if the cookie exists
        String cookieValue = getCookie(cookieName, httpRequest);
        if (cookieValue == null) {
            return;
        }

        Cookie expireCookie = new Cookie(cookieName, null);
        expireCookie.setHttpOnly(true);
        expireCookie.setPath("/");
        if ("PRODUCTION".equalsIgnoreCase(EnvConfig.getenvvar("ENV"))) {
            expireCookie.setDomain(".karan.email");
            expireCookie.setSecure(true);
        }
        expireCookie.setMaxAge(0);
        httpResponse.addCookie(expireCookie);
    }
}
