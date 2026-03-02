package com.example.discount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.discount.entity.Discount;
import java.time.LocalDate;
import java.util.List;

public interface DiscountRepository extends JpaRepository<Discount, Long> {

    List<Discount> findByEndDateAfter(LocalDate today);

}