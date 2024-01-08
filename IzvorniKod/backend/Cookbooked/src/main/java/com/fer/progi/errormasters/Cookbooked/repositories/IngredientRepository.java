package com.fer.progi.errormasters.Cookbooked.repositories;

import com.fer.progi.errormasters.Cookbooked.entities.Ingredient;
import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {

    @Query("SELECT r FROM Recipe r JOIN r.ingredients i WHERE i.id IN :ingredientIds GROUP BY r HAVING COUNT(i) = :ingredientCount")
    List<Recipe> findRecipesByIngredientIds(@Param("ingredientIds") List<Integer> ingredientIds, @Param("ingredientCount") Long ingredientCount);
}
