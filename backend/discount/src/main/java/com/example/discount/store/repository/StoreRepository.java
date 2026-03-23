// package com.example.discount.store.repository;

// import org.springframework.data.jpa.repository.JpaRepository;

// import com.example.discount.store.entity.Store;

// public interface StoreRepository
//         extends JpaRepository<Store, Long> {
// }

package com.example.discount.store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.discount.store.entity.Store;

public interface StoreRepository
        extends JpaRepository<Store, Long> {

    // ✅ VERY IMPORTANT (fetch stores of logged-in owner)
    List<Store> findByOwnerId(Long userId);
}