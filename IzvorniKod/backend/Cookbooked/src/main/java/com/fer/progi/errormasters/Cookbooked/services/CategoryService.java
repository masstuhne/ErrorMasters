package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.Category;
import com.fer.progi.errormasters.Cookbooked.repositories.CategoryRepostiory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    public List<Category> getAllCategories();

    public Optional<Category> getCategory(int id);

    Category getCategoryById(Integer categoryId);
}
