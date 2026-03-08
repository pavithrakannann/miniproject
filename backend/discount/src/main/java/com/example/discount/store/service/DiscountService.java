package com.example.discount.store.service;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import com.example.discount.store.entity.Discount;
import com.example.discount.store.entity.Product;
import com.example.discount.store.repository.DiscountRepository;
import com.example.discount.store.repository.ProductRepository;

@Service
public class DiscountService {

    private final DiscountRepository discountRepo;
    private final ProductRepository productRepo;

    public DiscountService(DiscountRepository discountRepo,
                           ProductRepository productRepo) {
        this.discountRepo = discountRepo;
        this.productRepo = productRepo;
    }

    public Discount addDiscount(Long productId, Discount discount) {

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        discount.setProduct(product);

        return discountRepo.save(discount);
    }
    public Discount updateDiscount(Long discountId, Discount updatedDiscount) {

    Discount existingDiscount = discountRepo.findById(discountId)
            .orElseThrow(() -> new RuntimeException("Discount not found"));

    existingDiscount.setDiscountPercentage(updatedDiscount.getDiscountPercentage());
    existingDiscount.setStartDate(updatedDiscount.getStartDate());
    existingDiscount.setEndDate(updatedDiscount.getEndDate());

    return discountRepo.save(existingDiscount);
}
public void deleteDiscount(Long discountId) {
    if (!discountRepo.existsById(discountId)) {
        throw new RuntimeException("Discount not found");
    }
    discountRepo.deleteById(discountId);
}

    public List<Discount> getActiveDiscounts() {
        return discountRepo.findByEndDateAfter(LocalDate.now());
    }
    
}