package java_backend.aspects;

import org.aspectj.lang.annotation.*;
import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import redis.clients.jedis.Jedis;

import jakarta.servlet.http.HttpServletRequest;
import java_backend.configs.RedisConfig;
import java_backend.utils.ApiResponse;
import java_backend.utils.BcryptUtil;
import java_backend.utils.MethodArgExtractor;

@Aspect
@Component
public class RequiresOtpAspect {

    @Around("@annotation(java_backend.annotations.RequiresOtp)")
    public Object verifyOtp(ProceedingJoinPoint joinPoint) throws Throwable {
        try {

            // using MethodArgExtractor util to extract parameters from the method
            String email = (String) MethodArgExtractor.extractParam(joinPoint, "email");
            String enteredOtp = (String) MethodArgExtractor.extractParam(joinPoint, "enteredOtp");

            // Fallback: Extracting from HTTP request if not found in method
            // parameters/arguments
            if (email == null || enteredOtp == null) {
                ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder
                        .currentRequestAttributes();
                HttpServletRequest request = attr.getRequest();

                if (email == null) {
                    String emailParam = request.getParameter("email");
                    if (emailParam != null) {
                        email = emailParam;
                    }
                }

                if (enteredOtp == null) {
                    String otpParam = request.getParameter("enteredOtp");
                    if (otpParam != null) {
                        enteredOtp = otpParam;
                    }
                }

            }

            // Validation
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.status(400)
                        .body(new ApiResponse(false, 400, "Email not found in request", null));
            }

            if (enteredOtp == null) {
                return ResponseEntity.status(400)
                        .body(new ApiResponse(false, 400, "OTP not found in request", null));
            }

            // Redis OTP verification
            Jedis jedis = RedisConfig.getJedis();

            if (jedis == null) {
                return ResponseEntity.status(500).body(new ApiResponse(false, 500, "Redis connection failed", null));
            }

            String storedOtp = jedis.get(email);

            if (storedOtp == null) {
                return ResponseEntity.status(400)
                        .body(new ApiResponse(false, 400, "OTP not found or expired", null));
            }

            if (!BcryptUtil.checkString(enteredOtp, storedOtp)) {
                return ResponseEntity.status(401)
                        .body(new ApiResponse(false, 401, "Incorrect OTP", null));
            }

            jedis.del(email);

            return joinPoint.proceed();

        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new ApiResponse(false, 500, "OTP verification error: " + e.getMessage(), null));
        }
    }
}