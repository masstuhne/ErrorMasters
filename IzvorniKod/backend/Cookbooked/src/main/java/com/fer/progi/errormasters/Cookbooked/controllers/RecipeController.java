package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.models.payloads.RecipeCreationModel;
import com.fer.progi.errormasters.Cookbooked.services.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
@AllArgsConstructor
public class RecipeController {

    RecipeService recipeService;

    @GetMapping
    public ResponseEntity<List<Recipe>> getRecipes(){
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_MEMBER ') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> addRecipe(@RequestBody RecipeCreationModel recipeCreateModel) {
        try {
            recipeService.addRecipe(recipeCreateModel);
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Greška prilikom spremanja recepta!");
        }
        return ResponseEntity.ok("Recept uspješno spremljen!");

    }




    // todo - razmisliti o tome da li ovo treba biti ovdje ili u drugom controlleru
    @GetMapping ("/user/{userId}")
    public ResponseEntity<List<Recipe>> getRecipesByUserId(Integer userId){
        return ResponseEntity.ok(recipeService.getRecipesByUserId(userId));
    }


    // todo - razmisliti o tome da li ovo treba biti ovdje ili u drugom controlleru
    @GetMapping ("/category/{categoryId}")
    public ResponseEntity<List<Recipe>> getRecipesByCategory(Integer categoryId){
        return ResponseEntity.ok(recipeService.getRecipesByCategory(categoryId));
    }


}
