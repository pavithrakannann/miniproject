package com.example.discount.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.discount.entity.Store;

public interface StoreRepository
        extends JpaRepository<Store, Long> {
}