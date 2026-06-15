package com.klu.controller;

import com.klu.models.User;

import com.klu.repository.UserRepository;

import com.klu.security.JwtUtil;

import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // SIGNUP
    @PostMapping("/signup")
    public Map<String, String> signup(
            @RequestBody User user
    ) {

        Map<String, String> response =
                new HashMap<>();

        User existingUser =
                userRepository.findByUsername(
                        user.getUsername()
                );

        if (existingUser != null) {

            response.put(
                    "message",
                    "Username Already Exists"
            );

            return response;
        }

        userRepository.save(user);

        response.put(
                "message",
                "Signup Successful"
        );

        return response;
    }

    // LOGIN
    @PostMapping("/login")
    public Map<String, String> login(
            @RequestBody Map<String, String> request
    ) {

        String username =
                request.get("username");

        String password =
                request.get("password");

        User user =
                userRepository.findByUsername(
                        username
                );

        if (
                user != null
                &&
                user.getPassword().equals(
                        password
                )
        ) {

            String token =
                    JwtUtil.generateToken(
                            username,
                            user.getRole()
                    );

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "token",
                    token
            );

            response.put(
                    "role",
                    user.getRole()
            );

            response.put(
                    "message",
                    "Login Successful"
            );

            return response;
        }

        throw new RuntimeException(
                "Invalid Credentials"
        );
    }
}
