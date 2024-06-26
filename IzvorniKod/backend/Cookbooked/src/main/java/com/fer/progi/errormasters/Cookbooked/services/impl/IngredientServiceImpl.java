package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.fer.progi.errormasters.Cookbooked.entities.Ingredient;
import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.repositories.IngredientRepository;
import com.fer.progi.errormasters.Cookbooked.services.IngredientService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class IngredientServiceImpl implements IngredientService {

    private final IngredientRepository ingredientRepository;

    @Override
    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    @Override
    public Optional<Ingredient> getIngredientById(Integer id) {
        return ingredientRepository.findById(id);
    }

    @Override
    public List<Recipe> getRecipesByIngredient(Integer ingredientId) {
        List<Recipe> recipes = ingredientRepository.findById(ingredientId).get().getRecipes();
        return recipes;
    }

    @Override
    public List<Recipe> getRecipesByIngredients(List<Integer> ingredientIds) {
        List<Recipe> recipes = ingredientRepository.findRecipesByIngredientIds(ingredientIds, (long) ingredientIds.size());
        return recipes;
    }


}
