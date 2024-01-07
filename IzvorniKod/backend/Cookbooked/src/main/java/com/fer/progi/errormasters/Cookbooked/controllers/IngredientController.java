package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.entities.Ingredient;
import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.repositories.IngredientRepository;
import com.fer.progi.errormasters.Cookbooked.services.CategoryService;
import com.fer.progi.errormasters.Cookbooked.services.IngredientService;
import com.fer.progi.errormasters.Cookbooked.services.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/ingredients")
public class IngredientController {
    private final IngredientService ingredientService;
    private final RecipeService recipeService;

    @GetMapping
    public ResponseEntity<List<Ingredient>> getIngredients(){
        List<Ingredient> ingredients = ingredientService.getAllIngredients();

        if (ingredients.isEmpty()){
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(ingredients);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<Ingredient> getIngredient(@PathVariable int id){
        Optional<Ingredient> ingredient = ingredientService.getIngredientById(id);

        if (ingredient.isPresent()){
            return ResponseEntity.ok(ingredient.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping ("/{ingredientId}/recipes")
    public ResponseEntity<List<Recipe>> getRecipesByIngredient(@PathVariable Integer ingredientId){
        List<Recipe> recipes = recipeService.getRecipesByIngredient(ingredientId);

        if (recipes.isEmpty()){
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(recipes);
        }
    }
}
