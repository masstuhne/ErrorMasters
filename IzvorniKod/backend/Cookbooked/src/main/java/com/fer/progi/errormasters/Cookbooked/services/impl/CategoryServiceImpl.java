package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.fer.progi.errormasters.Cookbooked.entities.Category;
import com.fer.progi.errormasters.Cookbooked.repositories.CategoryRepostiory;
import com.fer.progi.errormasters.Cookbooked.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepostiory categoryRepostiory;

    @Autowired
    public CategoryServiceImpl(CategoryRepostiory categoryRepostiory) {
        this.categoryRepostiory = categoryRepostiory;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepostiory.findAll();
    }

    @Override
    public Optional<Category> getCategory(int id) {
        return categoryRepostiory.findById(id);
    }
}
