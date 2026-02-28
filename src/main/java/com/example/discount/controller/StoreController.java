package com.example.discount.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.discount.entity.Store;
import com.example.discount.service.StoreService;

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

}