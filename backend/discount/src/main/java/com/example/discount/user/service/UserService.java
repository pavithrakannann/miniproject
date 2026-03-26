package com.example.discount.user.service;

import com.example.discount.user.dto.UserRequestDto;
import com.example.discount.user.dto.UserResponseDto;

public interface UserService {
    UserResponseDto register(UserRequestDto dto);
    UserResponseDto login(UserRequestDto dto);
    UserResponseDto getUserById(Long id);
}
