package com.example.discount.user.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.discount.user.dto.UserRequestDto;
import com.example.discount.user.dto.UserResponseDto;
import com.example.discount.user.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponseDto register(@RequestBody UserRequestDto dto) {
        return userService.register(dto);
    }

    @PostMapping("/login")
    public UserResponseDto login(@RequestBody UserRequestDto dto) {
        return userService.login(dto);
    }

    @GetMapping("/users/{id}")
    public UserResponseDto getById(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}
