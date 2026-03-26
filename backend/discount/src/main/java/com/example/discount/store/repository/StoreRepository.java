package com.example.discount.store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.discount.store.entity.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {
    List<Store> findByOwnerId(Long userId);
}
