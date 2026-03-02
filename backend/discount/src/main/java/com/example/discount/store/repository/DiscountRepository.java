package com.example.discount.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.discount.store.entity.Discount;
import java.time.LocalDate;
import java.util.List;

public interface DiscountRepository extends JpaRepository<Discount, Long> {

    List<Discount> findByEndDateAfter(LocalDate today);

}