package com.fer.progi.errormasters.Cookbooked.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "recipe")
public class Recipe {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "cuisine_id")
    private Cuisine cuisine;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(columnDefinition = "interval", name = "cooking_time")
    private Duration cookingTime;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<Media> media;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<BookmarkedRecipe> bookmarkedRecipes;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<RecipeRating> recipeRatings;

    @ManyToMany
    @JoinTable(
            name = "recipe_ingredient",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private List<Ingredient> ingredients;

    @ManyToMany
    @JoinTable(
            name = "tag_recipe",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;

}