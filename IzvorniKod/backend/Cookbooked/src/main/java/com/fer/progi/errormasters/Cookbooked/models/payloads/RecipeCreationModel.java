package com.fer.progi.errormasters.Cookbooked.models.payloads;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecipeCreationModel implements Serializable {

    private String title;
    private String description;

    private Integer cookingTime;

    private Integer categoryId;

    private Integer cuisineId;

    private List<Integer> ingredients;

    private List<String> tags;

    private List<MultipartFile> imageFiles;
    private MultipartFile videoFile;

}
