package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.models.payloads.RecipeCreationModel;
import com.fer.progi.errormasters.Cookbooked.repositories.RecipeRepository;
import com.fer.progi.errormasters.Cookbooked.services.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RecipeServiceImpl implements RecipeService {

    RecipeRepository recipeRepository;
    @Override
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    @Override
    public List<Recipe> getRecipesByCategory(Integer categoryId) {
        return recipeRepository.findAllByCategoryId(categoryId);

    }

    @Override
    public List<Recipe> getRecipesByUserId(Integer userId) {
        return recipeRepository.findAllByUserId(userId);
    }

    @Override
    public void addRecipe(RecipeCreationModel recipeCreateModel) {

    }
}
