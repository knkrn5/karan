package java_backend.aspects;

import java.util.Optional;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java_backend.models.UserModel;
import java_backend.utils.ApiResponse;
import java_backend.utils.MethodArgExtractor;
import java_backend.repositories.AuthRepository;

@Aspect
@Component
public class RequiresPasswordVerificationAspect {

    private final AuthRepository authRepository;

    @Autowired
    public RequiresPasswordVerificationAspect(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    @Around("@annotation(java_backend.annotations.RequiresPasswordVerification)")
    public Object verifyPassword(ProceedingJoinPoint joinPoint) throws Throwable {
        try {
            // Extract method parameters
            String email = (String) MethodArgExtractor.extractParam(joinPoint, "email");
            String enteredPassword = (String) MethodArgExtractor.extractParam(joinPoint, "enteredPassword");

            Optional<UserModel> userDataOptional = authRepository.findByEmail(email);

            if (userDataOptional.isEmpty()) {
                return ResponseEntity.status(404)
                        .body(new ApiResponse(false, 404, "User not found", null));
            }

            UserModel user = userDataOptional.get();

            if (user.checkPassword(enteredPassword)) {
                return joinPoint.proceed();
            } else {
                return ResponseEntity.status(403)
                        .body(new ApiResponse(false, 403, "Incorrect Password", null));
            }

        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new ApiResponse(false, 500,
                            "Password verification failed: " + e.getMessage(), null));
        }
    }
}
