package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.repositories.RecipeRepository;
import com.fer.progi.errormasters.Cookbooked.services.impl.RecipeServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class RecipeServiceTest {

    @Mock
    private RecipeRepository recipeRepostiory;

    @InjectMocks
    private RecipeServiceImpl recipeService;

    private List<Recipe> recipes = new ArrayList<>();


    @BeforeEach
    public void setup() {
        recipes.add(Recipe.builder().id(1).title("first").cookingTime(Duration.ofSeconds(3600)).build());
        recipes.add(Recipe.builder().id(2).title("second").cookingTime(Duration.ofSeconds(3600)).build());
        recipes.add(Recipe.builder().id(3).title("third").cookingTime(Duration.ofSeconds(3600)).build());
        recipes.add(Recipe.builder().id(4).title("fourth").cookingTime(Duration.ofSeconds(3600)).build());
        recipes.add(Recipe.builder().id(5).title("fifth").cookingTime(Duration.ofSeconds(3600)).build());
    }

    @Test
    void RecipeService_GetAll_ReturnRecipes() {
        given(recipeRepostiory.findAll()).willReturn(recipes);

        List<Recipe> recipeList = recipeService.getAllRecipes();

        assertThat(recipeList).isNotNull();
        for (Recipe recipe : recipeList) {
            assertThat(recipe.getCookingTime().equals(Duration.ofSeconds(3600)));
        }
    }
}