package com.example.discount.store.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.discount.store.entity.Discount;
import com.example.discount.store.service.DiscountService;

@RestController
@RequestMapping("/discounts")
public class DiscountController {

    private final DiscountService service;

    public DiscountController(DiscountService service) {
        this.service = service;
    }

    @PostMapping("/{productId}")
    public Discount addDiscount(@PathVariable Long productId,
                                @RequestBody Discount discount) {
        return service.addDiscount(productId, discount);
    }

    @GetMapping("/active")
    public List<Discount> getActiveDiscounts() {
        return service.getActiveDiscounts();
    }
    @PutMapping("/{discountId}")
public Discount updateDiscount(@PathVariable Long discountId,
                               @RequestBody Discount discount) {
    return service.updateDiscount(discountId, discount);
}
    @DeleteMapping("/{discountId}")
public String deleteDiscount(@PathVariable Long discountId) {
    service.deleteDiscount(discountId);
    return "Discount deleted successfully";
}
}