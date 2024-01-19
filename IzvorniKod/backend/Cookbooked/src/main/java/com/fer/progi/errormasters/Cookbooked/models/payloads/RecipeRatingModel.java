package com.fer.progi.errormasters.Cookbooked.models.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class RecipeRatingModel {
    private Integer rating;
    private String comment;
    private Date createdAt;
}
