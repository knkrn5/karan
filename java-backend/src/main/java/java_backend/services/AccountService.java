package java_backend.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.stereotype.Service;

import java_backend.models.UserModel;
import java_backend.repositories.AuthRepository;
import java_backend.utils.ApiResponse;

@Service
public class AccountService {

    private final AuthRepository authRepository;

    // Constructor-based injection
    @Autowired
    public AccountService(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    // required user data DTO
    public static class requiredUserDataDto {
        public String firstName;
        public String lastName;
        public String email;

        public requiredUserDataDto(UserModel userData) {
            this.firstName = userData.getFirstName();
            this.lastName = userData.getLastName();
            this.email = userData.getEmail();
        }
    }

    // get user data
    public ApiResponse getUserData(UUID userid) {

        if (userid == null)
            return new ApiResponse(false, 404, "User ID not found", null);

        Optional<UserModel> userData = authRepository.findById(userid);

        if (userData.isEmpty()) {
            return new ApiResponse(false, 404, "User not found", null);
        }

        requiredUserDataDto requiredUserData = new requiredUserDataDto(userData.get());

        return new ApiResponse(true, 200, "User data fetched successfully", requiredUserData);

    }

    // Delete user
    public ApiResponse deleteUser(String email) {

        if (email == null)
            return new ApiResponse(false, 404, "User ID not found", null);

        Optional<UserModel> userOptional = authRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return new ApiResponse(false, 404, "User not found", null);
        }

        UserModel user = userOptional.get();

        authRepository.delete(user);

        return new ApiResponse(true, 200, "User deleted successfully", null);
    }

}
