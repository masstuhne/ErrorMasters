package com.fer.progi.errormasters.Cookbooked.models.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
public class RecipeUpdateModel {
    private String title;
    private String description;
    private Integer cookingTime;
    private Integer categoryId;
    private Integer cuisineId;
}
