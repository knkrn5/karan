package java_backend.controllers;

import java_backend.services.AccountService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.interfaces.DecodedJWT;

import java_backend.utils.ApiResponse;

import java_backend.annotations.RequireAuth;
import java_backend.annotations.RequiresOtp;
import java_backend.annotations.RequiresPasswordVerification;

import java.util.UUID;

@RestController
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @RequireAuth
    @GetMapping("/get-user-data")
    public ResponseEntity<ApiResponse> getUserData(HttpServletRequest httpRequest) {
        try {
            DecodedJWT jwtToken = (DecodedJWT) httpRequest.getAttribute("decodedJWT");

            if (jwtToken == null) {
                return ResponseEntity.status(401).body(new ApiResponse(false, 401, "decoded jwttoken is null", null));
            }

            UUID userId = jwtToken.getClaim("id").as(UUID.class);

            ApiResponse response = accountService.getUserData(userId);
            return ResponseEntity.status(response.getStatusCode()).body(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body(new ApiResponse(false, 500, e.getMessage(), null));
        }
    }

    public static class DeleteuserDto {
        public String email;
        public String enteredOtp;
        public String enteredPassword;
    }

    @RequiresOtp
    @RequiresPasswordVerification
    @PostMapping("/delete-account")
    public ResponseEntity<ApiResponse> deleteUser(@RequestBody DeleteuserDto deleteUser) {
        try {
            ApiResponse response = accountService.deleteUser(deleteUser.email);
            return ResponseEntity.status(response.getStatusCode()).body(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body(new ApiResponse(false, 500, e.getMessage(), null));
        }
    }
}
