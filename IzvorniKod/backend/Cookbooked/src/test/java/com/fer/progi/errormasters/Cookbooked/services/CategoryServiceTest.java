package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.Category;
import com.fer.progi.errormasters.Cookbooked.repositories.CategoryRepostiory;
import com.fer.progi.errormasters.Cookbooked.services.impl.CategoryServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @Mock
    private CategoryRepostiory categoryRepostiory;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    private List<Category> categories = new ArrayList<>();

    @BeforeEach
    public void setup() {
        categories.add(new Category(1, "first", new ArrayList<>()));
        categories.add(new Category(2, "second", new ArrayList<>()));
        categories.add(new Category(3, "third", new ArrayList<>()));
        categories.add(new Category(4, "fourth", new ArrayList<>()));
        categories.add(new Category(5, "fifth", new ArrayList<>()));
    }

    @Test
    void CategoryService_GetAll_ReturnCategories() {
        given(categoryRepostiory.findAll()).willReturn(categories);

        List<Category> categoryList = categoryService.getAllCategories();

        assertThat(categoryList).isNotNull();
        assertThat(categoryList.size()).isEqualTo(5);
    }
}