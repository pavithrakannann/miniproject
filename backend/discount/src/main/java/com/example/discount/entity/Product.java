package com.example.discount.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;

    private Double price;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    public Product(){}

    public Long getId() { return id; }

    public String getProductName() { return productName; }

    public Double getPrice() { return price; }

    public Store getStore() { return store; }

    public void setId(Long id) { this.id = id; }

    public void setProductName(String productName) { this.productName = productName; }

    public void setPrice(Double price) { this.price = price; }

    public void setStore(Store store) { this.store = store; }
}