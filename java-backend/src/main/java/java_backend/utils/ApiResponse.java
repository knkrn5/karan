package java_backend.utils;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse {
    private boolean success;
    private int statusCode;
    private String message;
    private Object data;

    public ApiResponse() {
        // Default constructor for frameworks and serialization.
    }

    public ApiResponse(boolean success, int statusCode, String message, Object data) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}