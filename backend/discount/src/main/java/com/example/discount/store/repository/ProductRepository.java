package com.example.discount.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.discount.store.entity.Product;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByStoreId(Long storeId);

}