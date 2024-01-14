package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.entities.Tag;
import com.fer.progi.errormasters.Cookbooked.repositories.TagRepository;
import com.fer.progi.errormasters.Cookbooked.services.TagService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TagServiceImpl implements TagService {
    TagRepository tagRepository;
    @Override
    public Optional<Tag> getTagByName(String name) {
        return tagRepository.findByName(name);

    }

    @Override
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    @Override
    public List<Recipe> getRecipesWithTag(Integer tagId) {
        Tag tag = tagRepository.findById(tagId).orElse(null);
        if (tag != null) {
            return tag.getRecipe();
        } else {
            throw new RuntimeException("Tag with id " + tagId + " not found!");
        }
    }
}
