package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.entities.RecipeRating;
import com.fer.progi.errormasters.Cookbooked.entities.User;
import com.fer.progi.errormasters.Cookbooked.models.payloads.RecipeCreationModel;
import com.fer.progi.errormasters.Cookbooked.models.payloads.RecipeRatingModel;
import com.fer.progi.errormasters.Cookbooked.models.security.SecurityUserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface RecipeService {

    List<Recipe> getAllRecipes();

    Recipe getRecipeById(Integer recipeId);

    List<Recipe> getRecipesByCategory(Integer categoryId);

    List<Recipe> getRecipesByUserId(Integer userId);

    List<RecipeRating> getRecipeRatings(Integer recipeId);

    void rateRecipe(User user, Integer recipeId, RecipeRatingModel recipeRatingModel);

    void addRecipe(User user, RecipeCreationModel recipeCreateModel) throws IOException;

    List<Recipe> getRecipesByCuisine(Integer cuisineId);
}
