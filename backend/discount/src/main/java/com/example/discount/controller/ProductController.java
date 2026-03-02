package com.example.discount.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.discount.entity.Product;
import com.example.discount.service.ProductService;

@RestController
@RequestMapping("/products")
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