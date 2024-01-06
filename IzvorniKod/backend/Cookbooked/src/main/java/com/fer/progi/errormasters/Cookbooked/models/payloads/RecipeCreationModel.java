package com.fer.progi.errormasters.Cookbooked.models.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;


@Data
@AllArgsConstructor
public class RecipeCreationModel {

    private String title;
    private String description;

    private Integer cookingTime;

    private Integer categoryId;

    private Integer cuisineId;

    private List<Integer> ingredients;

    private List<String> tags;
}
