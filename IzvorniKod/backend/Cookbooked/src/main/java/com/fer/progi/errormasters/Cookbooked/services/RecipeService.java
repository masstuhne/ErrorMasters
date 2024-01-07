package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.entities.User;
import com.fer.progi.errormasters.Cookbooked.models.payloads.RecipeCreationModel;
import com.fer.progi.errormasters.Cookbooked.models.security.SecurityUserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface RecipeService {

    List<Recipe> getAllRecipes();

    List<Recipe> getRecipesByCategory(Integer categoryId);

    List<Recipe> getRecipesByUserId(Integer userId);


    void addRecipe(User user, RecipeCreationModel recipeCreateModel, List<MultipartFile> imageFiles, MultipartFile videoFiles);
}
