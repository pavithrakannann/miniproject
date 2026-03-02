package com.example.discount.store.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.discount.store.entity.Store;
import com.example.discount.store.service.StoreService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/store")
@CrossOrigin
public class StoreController {

    private final StoreService service;

    public StoreController(StoreService service){
        this.service = service;
    }

    @PostMapping("/add")

    public Store addStore(
            @RequestBody Store store){

        return service.saveStore(store);

    }
    @GetMapping("/all")
public List<Store> getAllStores() {
    return service.getAllStores();
}
@GetMapping("/{id}")
public Store getStoreById(@PathVariable Long id) {
    return service.getStoreById(id);
}
@PutMapping("/{id}")
public Store updateStore(@PathVariable Long id,
                         @RequestBody Store store) {
    return service.updateStore(id, store);
}
@DeleteMapping("/{id}")
public String deleteStore(@PathVariable Long id) {
    service.deleteStore(id);
    return "Store deleted successfully";
}

}