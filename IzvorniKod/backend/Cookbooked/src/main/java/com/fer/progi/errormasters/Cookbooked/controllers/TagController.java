package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.entities.Tag;
import com.fer.progi.errormasters.Cookbooked.services.TagService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tags")
@AllArgsConstructor
public class TagController {
    private final TagService tagService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<List<Tag>> getAllTags() {
        return ResponseEntity.ok(tagService.getAllTags());
    }

    @GetMapping("{tagId}/recipes")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<List<Recipe>> getRecipesByTagId(@PathVariable Integer tagId) {
        try {
            return ResponseEntity.ok(tagService.getRecipesWithTag(tagId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().header("Error", e.getMessage()).build();
        }
    }


}
