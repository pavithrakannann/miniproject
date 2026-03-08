package com.example.discount.category.controller;

import com.example.discount.category.entity.Category;
import com.example.discount.category.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // CREATE CATEGORY
    @PostMapping
    public Category createCategory(@Valid @RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    // GET ALL CATEGORIES
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    // GET CATEGORY BY ID
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }
}