package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.models.payloads.RecipeCreationModel;

import java.util.List;

public interface RecipeService {

    public List<Recipe> getAllRecipes();

    public List<Recipe> getRecipesByCategory(Integer categoryId);

    public List<Recipe> getRecipesByUserId(Integer userId);

    void addRecipe(RecipeCreationModel recipeCreateModel);
}
