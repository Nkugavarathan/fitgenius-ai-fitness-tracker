package com.example.fitgenius.dto;


import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class AuthResponse {
    private String token;

    public void setToken(String token) {
        this.token = token;
    }
}
