package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.filters.JwtAuthFilter;
import com.fer.progi.errormasters.Cookbooked.services.RecipeService;
import com.fer.progi.errormasters.Cookbooked.services.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(controllers = RecipeController.class)
@AutoConfigureMockMvc(addFilters = false)
class RecipeControllerTest {

    @MockBean
    RecipeService recipeService;

    @MockBean
    UserService userService;

    @MockBean
    JwtAuthFilter jwtAuthFilter;

    @InjectMocks
    RecipeController recipeController;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void RecipeController_GetById_ReturnRecipe() throws Exception {
        Integer givenId = 12345678;
        String givenTitle = "testName";
        Mockito.when(recipeService.getRecipeById(givenId))
                .thenReturn(Recipe.builder().title(givenTitle).id(givenId).build());

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/recipes/{id}", givenId)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(givenId))
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value(givenTitle))
                .andReturn();
    }
}