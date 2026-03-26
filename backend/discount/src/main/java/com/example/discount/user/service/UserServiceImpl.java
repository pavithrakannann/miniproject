package com.example.discount.user.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.discount.user.dto.UserRequestDto;
import com.example.discount.user.dto.UserResponseDto;
import com.example.discount.user.entity.User;
import com.example.discount.user.entity.UserRoleMapper;
import com.example.discount.user.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponseDto register(UserRequestDto dto) {
        if (dto.getName() == null || dto.getEmail() == null || dto.getPassword() == null || dto.getRole() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name, email, password, and role are required");
        }

        String normalizedEmail = dto.getEmail().trim().toLowerCase();
        if (userRepository.findByEmail(normalizedEmail).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        }

        try {
            UserRoleMapper.toRole(dto.getRole());
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Role must be USER or STORE_OWNER");
        }

        User user = new User();
        user.setName(dto.getName().trim());
        user.setEmail(normalizedEmail);
        user.setPassword(dto.getPassword());
        user.setPhone(dto.getPhone());
        user.setRole(UserRoleMapper.toDatabaseValue(dto.getRole()));

        return mapToResponse(userRepository.save(user));
    }

    @Override
    public UserResponseDto login(UserRequestDto dto) {
        if (dto.getEmail() == null || dto.getPassword() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and password are required");
        }

        User user = userRepository.findByEmail(dto.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!user.getPassword().equals(dto.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        return mapToResponse(user);
    }

    @Override
    public UserResponseDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return mapToResponse(user);
    }

    private UserResponseDto mapToResponse(User user) {
        UserResponseDto response = new UserResponseDto();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        try {
            response.setRole(UserRoleMapper.toResponseValue(user.getRole()));
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This account has an invalid role. Please contact support or register again.");
        }
        return response;
    }
}
