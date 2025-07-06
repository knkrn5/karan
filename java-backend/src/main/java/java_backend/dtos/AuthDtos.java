package java_backend.dtos;

import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

public class AuthDtos {

    private AuthDtos() {
        // Private constructor to prevent instantiation
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EmailDto {
        @Email(regexp = "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$", message = "Invalid email format")
        @NotBlank(message = "Email is required")
        private String email;
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OtpRequestDto extends EmailDto {
        @NotBlank(message = "Subject is required")
        private String subject;
        @NotBlank(message = "Excerpt is required")
        private String excerpt;
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OtpVerificationDto extends EmailDto {
        @NotBlank(message = "OTP is required")
        @Size(min = 6, message = "OTP must be at least 6 characters long")
        private String enteredOtp;
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RegisterUserDto extends EmailDto {
        @NotBlank(message = "First name is required")
        @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
        private String firstName;
        @Size(max = 50, message = "Last name must be max 50 characters")
        private String lastName;
        @Nullable
        private String phone;
        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters long")
        private String password;
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VerifyPasswordDto extends EmailDto {
        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters long")
        private String enteredPassword;
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginDto extends EmailDto {
        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters long")
        private String enteredPassword;
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResetPasswordDto extends EmailDto {
        @NotBlank(message = "New password is required")
        @Size(min = 8, message = "Password must be at least 8 characters long")
        private String newPassword;
        @NotBlank(message = "OTP is required")
        @Size(min = 6, message = "OTP must be at least 6 characters long")
        private String enteredOtp;
    }
}
