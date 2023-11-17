package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.Category;
import com.fer.progi.errormasters.Cookbooked.entities.Ingredient;
import com.fer.progi.errormasters.Cookbooked.repositories.IngredientRepository;

import java.util.List;
import java.util.Optional;

public interface IngredientService {

    public List<Ingredient> getAllIngredients();

    public Optional<Ingredient> getIngredientById(Integer id);


}
