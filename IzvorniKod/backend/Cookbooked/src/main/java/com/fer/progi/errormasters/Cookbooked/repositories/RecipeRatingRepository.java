package com.fer.progi.errormasters.Cookbooked.repositories;

import com.fer.progi.errormasters.Cookbooked.entities.RecipeRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRatingRepository extends JpaRepository<RecipeRating, Integer> {
}
