package com.example.discount.offer.entity;

import com.example.discount.store.entity.Store;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    private Double originalPrice;
    private Double discountPrice;

    private String type; // PRODUCT / SERVICE

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    // Getters & Setters

    public Long getId() { return id; }

    public String getTitle() { return title; }

    public String getDescription() { return description; }

    public Double getOriginalPrice() { return originalPrice; }

    public Double getDiscountPrice() { return discountPrice; }

    public String getType() { return type; }

    public Store getStore() { return store; }

    public void setId(Long id) { this.id = id; }

    public void setTitle(String title) { this.title = title; }

    public void setDescription(String description) { this.description = description; }

    public void setOriginalPrice(Double originalPrice) { this.originalPrice = originalPrice; }

    public void setDiscountPrice(Double discountPrice) { this.discountPrice = discountPrice; }

    public void setType(String type) { this.type = type; }

    public void setStore(Store store) { this.store = store; }
}