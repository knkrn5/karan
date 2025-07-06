package java_backend.utils;

// import static java_backend.configs.EnvConfig.dotenv;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;

public final class JwtUtil {

    // Prevent instantiation
    private JwtUtil() {
        throw new AssertionError("Utility class should not be instantiated");
    }

    public static DecodedJWT verifyJwtToken(String jwtToken, String jwtTokenSecret) {
        try {
            if (jwtToken == null)
                return null;

            Algorithm algorithm = Algorithm.HMAC256(jwtTokenSecret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(System.getProperty("JWT_ISSUER"))
                    .build();
            return verifier.verify(jwtToken);
        } catch (TokenExpiredException e) {
            System.err.println(jwtToken + " has expired: " + e.getMessage());
            return null;
        } catch (SignatureVerificationException e) {
            System.err.println(jwtToken + " Invalid signature: " + e.getMessage());
            return null;
        } catch (JWTDecodeException e) {
            System.err.println(" Malformed " + jwtToken + "(decode error): " + e.getMessage());
            return null;
        } catch (JWTVerificationException e) {
            System.err.println(jwtToken + " verification failed: " + e.getMessage());
            return null;
        }
    }

}