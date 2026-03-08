package com.example.discount.user.controller;

import com.example.discount.user.dto.UserRequestDto;
import com.example.discount.user.dto.UserResponseDto;
import com.example.discount.user.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponseDto register(@RequestBody UserRequestDto dto) {
        return userService.createUser(dto);
    }

    @GetMapping
    public List<UserResponseDto> getAll() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserResponseDto getById(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}