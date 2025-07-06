package java_backend.controllers;

import java_backend.annotations.RequiresOtp;
import java_backend.models.UserModel;
import java_backend.services.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

import java_backend.utils.ApiResponse;
import java_backend.utils.CookieUtil;

import java_backend.dtos.AuthDtos.OtpRequestDto;
import java_backend.dtos.AuthDtos.OtpVerificationDto;
import java_backend.dtos.AuthDtos.VerifyPasswordDto;
import java_backend.dtos.AuthDtos.LoginDto;
import java_backend.dtos.AuthDtos.ResetPasswordDto;
import java_backend.dtos.AuthDtos.RegisterUserDto;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/is-existing-user")
    public ResponseEntity<ApiResponse> isExistingUser(@RequestParam String email) {
        try {
            ApiResponse response = authService.isExistingUser(email);
            return ResponseEntity.status(response.getStatusCode()).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, 500, e.getMessage(), null));

        }
    }

    // send otp request DTO
    // public static class OtpRequestDto {
    // @NotBlank(message = "Email is required")
    // public String email;
    // public String subject;
    // public String excerpt;
    // }

    @PostMapping("/send-otp-mail")
    public ResponseEntity<ApiResponse> sendOtpMail(@RequestBody @Valid OtpRequestDto otpRequest) {
        try {
            ApiResponse response = authService.sendOtpMail(otpRequest.getEmail(), otpRequest.getSubject(),
                    otpRequest.getExcerpt());
            return ResponseEntity.status(response.getStatusCode()).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, 500, e.getMessage(), null));
        }
    }

    // public static class OtpVerificationDto {
    // public String email;
    // public String enteredOtp;
    // }

    @PostMapping("/verify-otp-mail")
    public ResponseEntity<ApiResponse> verifyOtpEmail(@RequestBody @Valid OtpVerificationDto otpVerification) {
        try {
            ApiResponse response = authService.verifyOtpEmail(otpVerification.getEmail(),
                    otpVerification.getEnteredOtp());
            return ResponseEntity.status(response.getStatusCode()).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, 500, e.getMessage(), null));
        }
    }

    @RequiresOtp
    @PostMapping("/register")
    public ResponseEntity<ApiResponse> createUser(@RequestBody @Valid RegisterUserDto user) {
        try {
            ApiResponse response = authService.register(user);
            return ResponseEntity.status(response.getStatusCode()).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, 500, e.getMessage(), null));
        }
    }

    // verify password DTO
    // public static class VerifyPasswordDto {
    // public String email;
    // public String enteredPassword;
    // }

    @PostMapping("/verify-password")
    public ResponseEntity<ApiResponse> verifyPassword(@RequestBody @Valid VerifyPasswordDto verifyPassword) {
        try {
            ApiResponse response = authService.verifyPassword(verifyPassword.getEmail(),
                    verifyPassword.getEnteredPassword());
            return ResponseEntity.status(response.getStatusCode()).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, 500, e.getMessage(), null));
        }
    }

    // login request DTO
    // public static class LoginDataDto {
    // public String email;
    // public String enteredPassword;
    // }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody @Valid LoginDto loginData,
            HttpServletResponse httpResponse) {
        try {
            ApiResponse response = authService.login(loginData.getEmail(), loginData.getEnteredPassword());

            if (response.getData() != null) {
                @SuppressWarnings("unchecked")
                Map<String, String> tokens = (Map<String, String>) response.getData();

                CookieUtil.addCookie("accessToken", tokens.get("accessToken"), 10 * 60, httpResponse);
                CookieUtil.addCookie("refreshToken", tokens.get("refreshToken"), 7 * 24 * 60 * 60, httpResponse);
            }

            return ResponseEntity.status(response.getStatusCode()).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, 500, e.getMessage(), null));
        }
    }

    @PostMapping("/renew-accesstoken")
    public ResponseEntity<ApiResponse> renewAccessToken(HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {
        try {
            String refreshToken = CookieUtil.getCookie("refreshToken", httpRequest);

            if (refreshToken == null) {
                return ResponseEntity.status(401).body(
                        new ApiResponse(false, 401, "Refresh token not found", null));
            }

            ApiResponse response = authService.renewAccessToken(refreshToken);

            if (response.isSuccess() && response.getData() != null) {
                CookieUtil.addCookie("accessToken", response.getData().toString(), 10 * 60, httpResponse);
            }

            return ResponseEntity.status(response.getStatusCode()).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    new ApiResponse(false, 500, "Internal server error", null));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        try {

            CookieUtil.removeCookie("accessToken", httpRequest, httpResponse);
            CookieUtil.removeCookie("refreshToken", httpRequest, httpResponse);

            return ResponseEntity.status(200)
                    .body(new ApiResponse(true, 200, "Logout Successful", null));

        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new ApiResponse(false, 500, "Logout Unsuccessful", null));
        }
    }

    // public static class resetPasswordDto {
    // public String email;
    // public String newPassword;
    // public String enteredOtp;
    // }

    @RequiresOtp
    @PatchMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@RequestBody @Valid ResetPasswordDto resetPassword) {
        try {
            ApiResponse response = authService.resetPassword(resetPassword.getEmail(), resetPassword.getNewPassword());
            return ResponseEntity.status(response.getStatusCode()).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, 500, e.getMessage(), null));
        }
    }

}
