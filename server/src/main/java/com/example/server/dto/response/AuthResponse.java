package com.example.server.dto.response;

public class AuthResponse {
    private final String message;
    private final UserResponse user;

    public AuthResponse(String message, UserResponse user) {
        this.message = message;
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public UserResponse getUser() {
        return user;
    }
}
