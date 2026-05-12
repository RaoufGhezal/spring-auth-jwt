package com.example.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.server.dto.request.LoginRequest;
import com.example.server.dto.request.RegisterRequest;
import com.example.server.dto.response.AuthResponse;
import com.example.server.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@CrossOrigin(origins = "${app.front_endpoint}",
        allowCredentials = "true") //cors
@RestController // make this class REST controller
@RequestMapping("/api/auth") // base url for all endpoints
public class AuthController {

    private final AuthService authService; //used t handle business logic

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request,
            //@Valid= check validation rules @NotBlank etc.
            // @RequestBody =read JSON from req body, transfer to RegisterRequest
            HttpServletResponse response
    ){
        AuthResponse result = authService.register(request, response);

        if (result.getUser() == null) {
            return ResponseEntity.status(409).body(result);
        }

        return ResponseEntity.status(201).body(result);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response
    ){
        AuthResponse result = authService.login(request, response);

        if (result.getUser() == null) {
            return ResponseEntity.status(409).body(result);
        }

        return ResponseEntity.status(201).body(result);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            HttpServletRequest request,
            HttpServletResponse response
    ){
        String result= authService.logout(request, response);

        return ResponseEntity.status(201).body(result);
    }


    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ){
        String result= authService.refreshToken(request, response);

        if(result.equals("Session not found or expired ")){
            return ResponseEntity.status(409).body(result);

        }

        return ResponseEntity.status(201).body(result);
    }


    @GetMapping("/me")
    public ResponseEntity<?> getUser(
            HttpServletRequest request,
            HttpServletResponse response
    ){
        Object result= authService.getUser(request, response);

        if(result.equals("Unauthorized")){
            return ResponseEntity.status(401).body(result);

        }
        if(result.equals("User not found")){
            return ResponseEntity.status(404).body(result);

        }

        return ResponseEntity.ok(result);
    }
}
