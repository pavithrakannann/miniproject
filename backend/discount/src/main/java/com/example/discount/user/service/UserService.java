package com.example.discount.user.service;

import com.example.discount.user.dto.UserRequestDto;
import com.example.discount.user.dto.UserResponseDto;

import java.util.List;

public interface UserService {

    UserResponseDto createUser(UserRequestDto dto);

    List<UserResponseDto> getAllUsers();

    UserResponseDto getUserById(Long id);
}