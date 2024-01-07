package com.fer.progi.errormasters.Cookbooked.repositories;

import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    List<Recipe> findAllByCategoryId(Integer categoryId);

    List<Recipe> findAllByUserId(Integer userId);

    List<Recipe> findAllByCuisineId(Integer cuisineId);
}
