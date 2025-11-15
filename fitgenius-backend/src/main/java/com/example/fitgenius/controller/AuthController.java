package com.example.fitgenius.controller;

import com.example.fitgenius.dto.AuthResponse;
import com.example.fitgenius.dto.LoginRequest;
import com.example.fitgenius.dto.RegisterRequest;
import com.example.fitgenius.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
//@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // React frontend
public class AuthController {

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    private final AuthService authService;


    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request){
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request){
        return authService.login(request);
    }
}
