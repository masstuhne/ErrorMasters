package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.entities.User;
import com.fer.progi.errormasters.Cookbooked.models.payloads.RecipeCreationModel;
import com.fer.progi.errormasters.Cookbooked.models.security.SecurityUserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface RecipeService {

    public List<Recipe> getAllRecipes();

    public List<Recipe> getRecipesByCategory(Integer categoryId);

    public List<Recipe> getRecipesByUserId(Integer userId);


    void addRecipe(User user, RecipeCreationModel recipeCreateModel, List<MultipartFile> imageFiles, MultipartFile videoFiles);
}
