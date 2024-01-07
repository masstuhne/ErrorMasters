package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.fer.progi.errormasters.Cookbooked.entities.*;
import com.fer.progi.errormasters.Cookbooked.models.payloads.RecipeCreationModel;
import com.fer.progi.errormasters.Cookbooked.models.payloads.RecipeRatingModel;
import com.fer.progi.errormasters.Cookbooked.models.security.SecurityUserDetails;
import com.fer.progi.errormasters.Cookbooked.repositories.RecipeRepository;
import com.fer.progi.errormasters.Cookbooked.services.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RecipeServiceImpl implements RecipeService {

    RecipeRepository recipeRepository;
    CategoryService categoryService;
    IngredientService ingredientService;
    CuisineService cuisineService;
    TagService tagService;


    @Override
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    @Override
    public Recipe getRecipeById(Integer recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);

        if (recipe != null) {
            return recipe;
        } else {
            throw new RuntimeException("Recipe with id " + recipeId + " not found!");
        }
    }

    @Override
    public List<Recipe> getRecipesByCategory(Integer categoryId) {
        return recipeRepository.findAllByCategoryId(categoryId);

    }

    @Override
    public List<Recipe> getRecipesByUserId(Integer userId) {
        return recipeRepository.findAllByUserId(userId);
    }

    @Override
    public List<RecipeRating> getRecipeRatings(Integer recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);

        if (recipe != null) {
            return recipe.getRecipeRatings();
        } else {
            throw new RuntimeException("Recipe with id " + recipeId + " not found!");
        }
    }

    @Override
    public void rateRecipe(User user, Integer recipeId, RecipeRatingModel recipeRatingModel) {
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);

        if (recipe == null){
            throw new RuntimeException("Recipe with id " + recipeId + " not found!");
        }

        RecipeRating recipeRating = new RecipeRating();
        recipeRating.setUser(user);
        recipeRating.setRecipe(recipe);
        recipeRating.setRating(recipeRatingModel.getRating());
        recipeRating.setComment(recipeRatingModel.getComment());
        recipeRating.setCreatedAt(recipeRatingModel.getCreatedAt());

        recipe.getRecipeRatings().add(recipeRating);

        recipeRepository.save(recipe);
    }

    @Override
    public void addRecipe(User user, RecipeCreationModel recipeCreateModel, List<MultipartFile> imageFiles, MultipartFile videoFiles) {

        Recipe recipe = new Recipe();

        recipe.setTitle(recipeCreateModel.getTitle());
        recipe.setDescription(recipeCreateModel.getDescription());
        recipe.setCookingTime(Duration.ofMinutes(recipeCreateModel.getCookingTime()));
        recipe.setCategory(categoryService.getCategoryById(recipeCreateModel.getCategoryId()));
        recipe.setUser(user);

        Optional<Cuisine> cuisine = cuisineService.getCuisineById(recipeCreateModel.getCuisineId());
        cuisine.ifPresent(recipe::setCuisine);

        List<Ingredient> ingredients = new ArrayList<>();
        for (Integer ingredientId: recipeCreateModel.getIngredients()) {
            Optional<Ingredient> ingred = ingredientService.getIngredientById(ingredientId);
            ingred.ifPresent(ingredients::add);
        }
        recipe.setIngredients(ingredients);

        List<Tag> tags = new ArrayList<>();

        for (String tag: recipeCreateModel.getTags()) {
            Optional<Tag> tagOptional = tagService.getTagByName(tag);
            if (tagOptional.isPresent()) {
                tags.add(tagOptional.get());
            }
            else {
                Tag newTag = new Tag();
                newTag.setName(tag);
                tags.add(newTag);
            }

        }

        recipe.setTags(tags);


        //todo s3 slike i video


    }
}
