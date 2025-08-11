package java_backend.services;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Optional;
import java.util.UUID;
import java.util.Map;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.exceptions.JedisConnectionException;

import org.springframework.stereotype.Service;

import com.auth0.jwt.interfaces.DecodedJWT;

import java_backend.models.UserModel;
import java_backend.repositories.AuthRepository;
import java_backend.utils.ApiResponse;

import java_backend.utils.JwtUtil;
import java_backend.utils.EmailSender;

import java_backend.mails.templates.OtpEmailTemplate;

import java_backend.configs.RedisConfig;
import java_backend.configs.EnvConfig;

import java_backend.utils.BcryptUtil;

import java_backend.dtos.AuthDtos.RegisterUserDto;

@Service
public class AuthService {

    private final EmailSender emailSender;
    private final AuthRepository authRepository;

    // Constructor-based dependency injection
    public AuthService(AuthRepository authRepository, EmailSender emailSender) {
        this.authRepository = authRepository;
        this.emailSender = emailSender;
    }

    // checking existing user
    public ApiResponse isExistingUser(String email) {
        boolean isExistingUser = authRepository.findByEmail(email).isPresent();

        if (isExistingUser) {
            return new ApiResponse(true, 200, "User already exists", null);
        } else {
            return new ApiResponse(false, 200, "User does not exist", null);
        }
    }

    // sending otp email
    public ApiResponse sendOtpMail(String email, String subject, String excerpt) {

        SecureRandom random = new SecureRandom();
        int otp = 100000 + random.nextInt(900000);
        long otpTtl = 0;

        String hashedOtp = BcryptUtil.hashString(String.valueOf(otp));

        try (Jedis jedis = RedisConfig.getJedis()) {
            jedis.setex(email, 300, hashedOtp);
            otpTtl = jedis.ttl(email);
        } catch (JedisConnectionException e) {
            return new ApiResponse(false, 500, "Redis Connection Error: " + e.getMessage(), null);
        } catch (Exception e) {
            return new ApiResponse(false, 500, "An error occurred while sending OTP: " + e.getMessage(), null);
        }

        String otpSubject = otp + " is your " + subject + " OTP code";

        String htmlEmailContent = OtpEmailTemplate.otpEmailTemplate(otp, excerpt);

        emailSender.sendEmail(email, otpSubject, htmlEmailContent);

        return new ApiResponse(true, 200, "OTP sent successfully", otpTtl);

    }

    // verifying otp email
    public ApiResponse verifyOtpEmail(String email, String enteredOtp) {

        try (Jedis jedis = RedisConfig.getJedis()) {
            String storedOtp = jedis.get(email);

            if (storedOtp == null) {
                return new ApiResponse(false, 400, "OTP not found or expired", null);
            }

            if (!BcryptUtil.checkString(enteredOtp, storedOtp)) {
                return new ApiResponse(false, 400, "Incorrect OTP", null);
            }
            return new ApiResponse(true, 200, "OTP verified successfully", null);
        }
    }

    // auth register
    public ApiResponse register(RegisterUserDto user) {

        ApiResponse isExistingUserResponse = isExistingUser(user.getEmail());
        if (isExistingUserResponse.isSuccess()) {
            return isExistingUserResponse;
        }

        UserModel userData = UserModel.builder() // Mapping UserModel using the lombok builder
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail().toLowerCase())
                .phone(user.getPhone())
                .build();

        userData.setPassword(user.getPassword());

        UserModel newUser = authRepository.save(userData);
        return new ApiResponse(true, 200, "User registered successfully", newUser);
    }

    // verify password
    public ApiResponse verifyPassword(String email, String enteredPassword) {
        Optional<UserModel> userDataOptional = authRepository.findByEmail(email);
        if (userDataOptional.isEmpty()) {
            return new ApiResponse(false, 404, "User not found", null);
        }
        UserModel user = userDataOptional.get();
        if (user.checkPassword(enteredPassword)) {
            return new ApiResponse(true, 200, "Password verified successfully", null);
        } else {
            return new ApiResponse(false, 401, "Incorrect password", null);
        }
    }

    // auth login
    public ApiResponse login(String email, String enteredPassword) {
        Optional<UserModel> userDataOptional = authRepository.findByEmail(email);

        if (userDataOptional.isEmpty()) {
            return new ApiResponse(false, 404, "User not found", null);
        }

        UserModel user = userDataOptional.get();
        if (user.checkPassword(enteredPassword)) {
            String accessToken = user.createAccessToken();
            String refreshToken = null;

            String refreshTokenInDb = user.getRefreshToken();
            DecodedJWT decodedRefreshToken = JwtUtil.verifyJwtToken(refreshTokenInDb,
                    EnvConfig.getenvvar("REFRESH_TOKEN_SECRET"));
            if (decodedRefreshToken == null) {
                refreshToken = user.createRefreshToken();
            } else {
                refreshToken = refreshTokenInDb;
            }

            user.setRefreshToken(refreshToken);
            authRepository.save(user);

            // Create a Map to hold both tokens
            Map<String, String> tokens = new HashMap<>();
            tokens.put("accessToken", accessToken);
            tokens.put("refreshToken", refreshToken);

            return new ApiResponse(true, 200, "Login successful", tokens);
        } else {
            return new ApiResponse(false, 401, "Incorrect password", null);
        }
    }

    // renewing access token
    public ApiResponse renewAccessToken(String refreshToken) {
        if (refreshToken == null || refreshToken.trim().isEmpty()) {
            return new ApiResponse(false, 401, "Refresh token is required", null);
        }

        DecodedJWT decodedJWT = JwtUtil.verifyJwtToken(refreshToken, EnvConfig.getenvvar("REFRESH_TOKEN_SECRET"));
        if (decodedJWT == null) {
            return new ApiResponse(false, 401, "Invalid or expired refresh token", null);
        }

        UUID userId = decodedJWT.getClaim("id").as(UUID.class);
        Optional<UserModel> user = authRepository.findById(userId);

        if (user.isEmpty()) {
            return new ApiResponse(false, 404, "User not found", null);
        }

        if (!user.get().getRefreshToken().equals(refreshToken)) {
            return new ApiResponse(false, 401, "Invalid refresh token, please login again", null);
        }

        // Generating new access token
        String accessToken = user.get().createAccessToken();
        return new ApiResponse(true, 200, "Access token renewed successfully", accessToken);
    }

    // Reset password
    public ApiResponse resetPassword(String email, String newPassword) {
        Optional<UserModel> userDataOptional = authRepository.findByEmail(email);
        if (userDataOptional.isEmpty()) {
            return new ApiResponse(false, 404, "User not found", null);
        }

        UserModel user = userDataOptional.get();
        user.setPassword(newPassword);
        authRepository.save(user);

        return new ApiResponse(true, 200, "Password reset successfully", null);
    }

}
