package java_backend.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import java_backend.models.UserModel;
import java_backend.repositories.AuthRepository;
import java_backend.utils.ApiResponse;
import redis.clients.jedis.Jedis;
import java_backend.configs.RedisConfig;

import java_backend.dtos.AccountDtos.RequiredUserDataDto;

@Service
public class AccountService {

    private final AuthRepository authRepository;

    // Constructor-based dependency injection
    public AccountService(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    // get user data
    public ApiResponse getUserData(UUID userid) {
        if (userid == null) {
            return new ApiResponse(false, 404, "User ID cannot be empty", null);
        }

        ObjectMapper mapper = new ObjectMapper();

        try (Jedis jedis = RedisConfig.getJedis()) {
            String cachedUserData = jedis.get(userid.toString());

            if (cachedUserData != null) {
                // Convert JSON string back to RequiredUserDataDto
                RequiredUserDataDto requiredUserData = mapper.readValue(cachedUserData, RequiredUserDataDto.class);
                return new ApiResponse(true, 200, "User data fetched from Redis", requiredUserData);
            }

            // Not in cache → fetch from DB
            Optional<UserModel> userData = authRepository.findById(userid);
            if (userData.isEmpty()) {
                return new ApiResponse(false, 404, "User not found", null);
            }

            RequiredUserDataDto requiredUserData = new RequiredUserDataDto(userData.get());

            // Save to Redis as JSON for 1 hour
            String jsonUserData = mapper.writeValueAsString(requiredUserData);
            jedis.setex(userid.toString(), 3600, jsonUserData);

            return new ApiResponse(true, 200, "User data fetched successfully", requiredUserData);
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse(false, 500, "Server error: " + e.getMessage(), null);
        }
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
