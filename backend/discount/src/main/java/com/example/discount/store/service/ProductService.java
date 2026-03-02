package com.example.discount.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.example.discount.entity.Product;
import com.example.discount.entity.Store;
import com.example.discount.repository.ProductRepository;
import com.example.discount.repository.StoreRepository;

@Service
public class ProductService {

    private final ProductRepository productRepo;
    private final StoreRepository storeRepo;

    public ProductService(ProductRepository productRepo,
                          StoreRepository storeRepo) {
        this.productRepo = productRepo;
        this.storeRepo = storeRepo;
    }

    public Product addProduct(Long storeId, Product product) {

        Store store = storeRepo.findById(storeId)
                .orElseThrow(() -> new RuntimeException("Store not found"));

        product.setStore(store);

        return productRepo.save(product);
    }
    public void deleteProduct(Long productId) {
    if (!productRepo.existsById(productId)) {
        throw new RuntimeException("Product not found");
    }
    productRepo.deleteById(productId);
}
public Product updateProduct(Long productId, Product updatedProduct) {

    Product existingProduct = productRepo.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));

    existingProduct.setProductName(updatedProduct.getProductName());
    existingProduct.setPrice(updatedProduct.getPrice());

    return productRepo.save(existingProduct);
}

    public List<Product> getProductsByStore(Long storeId) {
        return productRepo.findByStoreId(storeId);
    }
    
}