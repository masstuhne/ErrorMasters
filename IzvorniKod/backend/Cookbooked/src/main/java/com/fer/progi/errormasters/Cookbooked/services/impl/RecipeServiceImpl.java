package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.fer.progi.errormasters.Cookbooked.entities.*;
import com.fer.progi.errormasters.Cookbooked.models.payloads.RecipeCreationModel;
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
    public List<Recipe> getRecipesByCategory(Integer categoryId) {
        return recipeRepository.findAllByCategoryId(categoryId);

    }

    @Override
    public List<Recipe> getRecipesByUserId(Integer userId) {
        return recipeRepository.findAllByUserId(userId);
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
