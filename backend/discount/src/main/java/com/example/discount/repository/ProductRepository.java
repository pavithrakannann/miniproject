package com.example.discount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.discount.entity.Product;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByStoreId(Long storeId);

}