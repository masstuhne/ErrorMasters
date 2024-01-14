package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.entities.Tag;

import java.util.List;
import java.util.Optional;

public interface TagService {

    Optional<Tag> getTagByName(String name);

    List<Tag> getAllTags();

    List<Recipe> getRecipesWithTag(Integer tagId);
}
