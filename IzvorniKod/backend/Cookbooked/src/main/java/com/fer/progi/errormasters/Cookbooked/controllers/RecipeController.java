package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.entities.RecipeRating;
import com.fer.progi.errormasters.Cookbooked.entities.User;
import com.fer.progi.errormasters.Cookbooked.models.payloads.RecipeCreationModel;
import com.fer.progi.errormasters.Cookbooked.models.payloads.RecipeRatingModel;
import com.fer.progi.errormasters.Cookbooked.models.payloads.RecipeUpdateModel;
import com.fer.progi.errormasters.Cookbooked.models.security.SecurityUserDetails;
import com.fer.progi.errormasters.Cookbooked.services.RecipeService;
import com.fer.progi.errormasters.Cookbooked.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
@AllArgsConstructor
@Slf4j
public class RecipeController {

    RecipeService recipeService;
    UserService userService;

    @GetMapping
    public ResponseEntity<List<Recipe>> getRecipes(){
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }

    @GetMapping("/{recipeId}")
public ResponseEntity<Recipe> getRecipeById(@PathVariable Integer recipeId){
        try {
            Recipe recipe = recipeService.getRecipeById(recipeId);
            return ResponseEntity.ok(recipe);
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }



    @PostMapping(value = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasRole('ROLE_MEMBER ') or hasRole('ROLE_ADMIN')")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<String> addRecipe( @ModelAttribute RecipeCreationModel recipeCreationModel) {
        SecurityUserDetails user = (SecurityUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userDetails = userService.getUserByUsername(user.getUsername());
        try {
            recipeService.addRecipe(userDetails, recipeCreationModel);
        } catch (Exception e){
            log.error("Error while saving recipe : ", e);
            if (recipeCreationModel !=null) {
                log.error(recipeCreationModel.toString());
            }
            else {
                log.error("Recipe creation model is null");
            }
            return ResponseEntity.badRequest().body("Greška prilikom spremanja recepta!");
        }
        return ResponseEntity.ok("Recept uspješno spremljen!");

    }

    @GetMapping(value = "{recipeId}/recipe-ratings")
    public ResponseEntity<List<RecipeRating>> getRecipeRatings(@PathVariable Integer recipeId) {
        try {
            List<RecipeRating> recipeRatings = recipeService.getRecipeRatings(recipeId);

            if (recipeRatings.isEmpty()){
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(recipeRatings);
            }
        } catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping(value = "{recipeId}/recipe-ratings")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<String> rateRecipe(@PathVariable Integer recipeId, @RequestBody RecipeRatingModel rating) {
        SecurityUserDetails user = (SecurityUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userDetails = userService.getUserByUsername(user.getUsername());
        try {
            recipeService.rateRecipe(userDetails, recipeId, rating);
            return ResponseEntity.ok("Recept uspješno ocijenjen!");

        } catch (Exception e){
            return ResponseEntity.badRequest().body("Greška prilikom ocjenjivanja recepta!");
        }
    }

    @PutMapping("/{recipeId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<String> updateRecipe(@PathVariable Integer recipeId, @RequestBody RecipeUpdateModel recipeModel){
        try {
            recipeService.updateRecipe(recipeId, recipeModel);

            return ResponseEntity.ok("Recept uspješno ažuriran!");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Greška prilikom ažuriranja recepta!");
        }
    }

    @DeleteMapping("/{recipeId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<String> deleteRecipe(@PathVariable Integer recipeId){
        try {
            recipeService.deleteRecipe(recipeId);

            return ResponseEntity.ok("Recept uspješno obrisan!");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Greška prilikom brisanja recepta!");
        }
    }

}
