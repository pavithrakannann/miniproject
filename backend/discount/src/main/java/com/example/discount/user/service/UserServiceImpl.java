package com.example.discount.user.service;

import com.example.discount.user.dto.UserRequestDto;
import com.example.discount.user.dto.UserResponseDto;
import com.example.discount.user.entity.User;
import com.example.discount.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponseDto createUser(UserRequestDto dto) {

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setPhone(dto.getPhone());

        User savedUser = userRepository.save(user);

        return mapToResponse(savedUser);
    }

    @Override
    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToResponse(user);
    }

    private UserResponseDto mapToResponse(User user) {
        UserResponseDto res = new UserResponseDto();
        res.setId(user.getId());
        res.setName(user.getName());
        res.setEmail(user.getEmail());
        res.setPhone(user.getPhone());
        return res;
    }
}