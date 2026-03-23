package com.example.discount.store.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.discount.store.entity.Product;
import com.example.discount.store.service.ProductService;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping("/{storeId}")
    public Product addProduct(@PathVariable Long storeId,
                              @RequestBody Product product) {
        return service.addProduct(storeId, product);
    }

    @GetMapping("/store/{storeId}")
    public List<Product> getProducts(@PathVariable Long storeId) {
        return service.getProductsByStore(storeId);
    }
    @PutMapping("/{productId}")
public Product updateProduct(@PathVariable Long productId,
                             @RequestBody Product product) {
    return service.updateProduct(productId, product);
}
    @DeleteMapping("/{productId}")
public String deleteProduct(@PathVariable Long productId) {
    service.deleteProduct(productId);
    return "Product deleted successfully";
}
}