package com.example.discount.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "discount")
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double discountPercentage;

    private LocalDate startDate;

    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public Discount(){}

    public Long getId() { return id; }

    public Double getDiscountPercentage() { return discountPercentage; }

    public LocalDate getStartDate() { return startDate; }

    public LocalDate getEndDate() { return endDate; }

    public Product getProduct() { return product; }

    public void setId(Long id) { this.id = id; }

    public void setDiscountPercentage(Double discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public void setProduct(Product product) { this.product = product; }
}