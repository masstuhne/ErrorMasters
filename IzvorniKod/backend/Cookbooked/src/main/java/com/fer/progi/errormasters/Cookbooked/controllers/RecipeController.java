package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.entities.User;
import com.fer.progi.errormasters.Cookbooked.models.payloads.RecipeCreationModel;
import com.fer.progi.errormasters.Cookbooked.models.security.SecurityUserDetails;
import com.fer.progi.errormasters.Cookbooked.services.RecipeService;
import com.fer.progi.errormasters.Cookbooked.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/recipes")
@AllArgsConstructor
public class RecipeController {

    RecipeService recipeService;
    UserService userService;

    @GetMapping
    public ResponseEntity<List<Recipe>> getRecipes(){
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ROLE_MEMBER ') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> addRecipe(@RequestPart("recipe") RecipeCreationModel recipeCreateModel, @RequestPart("images") List<MultipartFile> imageFiles, @RequestPart("video") MultipartFile videoFiles) {
        SecurityUserDetails user = (SecurityUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userDetails = userService.getUserByUsername(user.getUsername());
        try {
            recipeService.addRecipe(userDetails, recipeCreateModel, imageFiles, videoFiles);
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
