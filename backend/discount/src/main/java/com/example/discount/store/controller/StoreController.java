package com.example.discount.store.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.discount.store.dto.StoreRequestDto;
import com.example.discount.store.dto.StoreResponseDto;
import com.example.discount.store.service.StoreService;

@RestController
@RequestMapping("/api/shops")
public class StoreController {

    private final StoreService storeService;

    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @PostMapping("/owner/{userId}")
    public StoreResponseDto addStore(@PathVariable Long userId, @RequestBody StoreRequestDto store) {
        return storeService.saveStoreWithUser(store, userId);
    }

    @GetMapping("/all")
    public List<StoreResponseDto> getAllStores() {
        return storeService.getAllStores();
    }

    @GetMapping("/{id}")
    public StoreResponseDto getStoreById(@PathVariable Long id) {
        return storeService.getStoreById(id);
    }

    @GetMapping("/owner/{userId}")
    public List<StoreResponseDto> getStoresByUser(@PathVariable Long userId) {
        return storeService.getStoresByUserId(userId);
    }

    @PutMapping("/{id}")
    public StoreResponseDto updateStore(@PathVariable Long id, @RequestBody StoreRequestDto store) {
        return storeService.updateStore(id, store);
    }

    @DeleteMapping("/{id}")
    public String deleteStore(@PathVariable Long id) {
        storeService.deleteStore(id);
        return "Shop deleted successfully";
    }
}
