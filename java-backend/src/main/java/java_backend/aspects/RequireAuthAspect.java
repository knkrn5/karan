package java_backend.aspects;

import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.http.HttpServletRequest;

// import static java_backend.configs.EnvConfig.dotenv;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java_backend.utils.ApiResponse;

import java_backend.utils.JwtUtil;
import java_backend.utils.CookieUtil;

@Aspect
@Component
public class RequireAuthAspect {

    @Around("@annotation(java_backend.annotations.RequireAuth)")
    public Object authenticate(ProceedingJoinPoint joinPoint) throws Throwable {
        try {
            ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (attrs == null) {
                return ResponseEntity.status(401)
                        .body(new ApiResponse(false, 401, "Request context is missing", null));
            }

            HttpServletRequest request = attrs.getRequest();

            String accessToken = CookieUtil.getCookie("accessToken", request);
            if (accessToken == null) {
                return ResponseEntity.status(400)
                        .body(new ApiResponse(false, 400, "Access token missing", null));
            }

            DecodedJWT decodedJWT = JwtUtil.verifyJwtToken(accessToken, System.getProperty("ACCESS_TOKEN_SECRET"));
            if (decodedJWT == null) {
                return ResponseEntity.status(401)
                        .body(new ApiResponse(false, 401, "Invalid token", null));
            }

            request.setAttribute("decodedJWT", decodedJWT);

            return joinPoint.proceed();
        } catch (Exception e) {
            // You can log this too
            return ResponseEntity.status(500)
                    .body(new ApiResponse(false, 500, "RequireAuth verification failed " + e.getMessage(), null));
        }
    }

}
