package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.entities.Ingredient;
import com.fer.progi.errormasters.Cookbooked.repositories.IngredientRepository;
import com.fer.progi.errormasters.Cookbooked.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ingredients")
public class IngredientController {
    @Autowired
    private IngredientRepository ingredientRepository;
    @GetMapping
    public ResponseEntity<List<Ingredient>> GetIngredients(){
        List<Ingredient> ingredients = ingredientRepository.findAll();

        if (ingredients.isEmpty()){
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(ingredients);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<Ingredient> GetIngredient(@PathVariable int id){
        Optional<Ingredient> ingredient = ingredientRepository.findById(id);

        if (ingredient.isPresent()){
            return ResponseEntity.ok(ingredient.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
