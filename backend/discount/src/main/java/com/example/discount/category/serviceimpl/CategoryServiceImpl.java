package com.example.discount.category.serviceimpl;

import com.example.discount.category.entity.Category;
import com.example.discount.category.repository.CategoryRepository;
import com.example.discount.category.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category createCategory(Category category) {

        // 🔒 prevent duplicate category names
        categoryRepository.findByName(category.getName())
                .ifPresent(c -> {
                    throw new RuntimeException("Category already exists: " + category.getName());
                });

        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }
}