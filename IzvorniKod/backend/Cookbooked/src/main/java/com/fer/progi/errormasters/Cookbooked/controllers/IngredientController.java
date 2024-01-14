package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.entities.Ingredient;
import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.repositories.IngredientRepository;
import com.fer.progi.errormasters.Cookbooked.services.CategoryService;
import com.fer.progi.errormasters.Cookbooked.services.IngredientService;
import com.fer.progi.errormasters.Cookbooked.services.RecipeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/ingredients")
@Slf4j
public class IngredientController {
    private final IngredientService ingredientService;

    @GetMapping
    public ResponseEntity<List<Ingredient>> getIngredients(){
        List<Ingredient> ingredients = ingredientService.getAllIngredients();

        return ResponseEntity.ok(ingredients);
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
        List<Recipe> recipes = ingredientService.getRecipesByIngredient(ingredientId);

        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/recipes")
    public ResponseEntity<List<Recipe>> getRecipesByIngredients(@RequestParam List<Integer> ingredientIds) {
        try {
            List<Recipe> recipes = ingredientService.getRecipesByIngredients(ingredientIds);

            return ResponseEntity.ok(recipes);
        }
        catch (Exception e){
            log.error("Error while getting recipes by ingredients: ", e);

            return ResponseEntity.badRequest().header("Error", e.getMessage()).build();
        }
    }
}
