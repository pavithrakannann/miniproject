package com.example.discount.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.discount.user.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // custom method
    Optional<User> findByEmail(String email);
}