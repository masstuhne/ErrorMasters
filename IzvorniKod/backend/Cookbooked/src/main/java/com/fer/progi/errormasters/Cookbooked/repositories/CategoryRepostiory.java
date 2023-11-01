package com.fer.progi.errormasters.Cookbooked.repositories;

import com.fer.progi.errormasters.Cookbooked.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CategoryRepostiory extends JpaRepository<Category, Integer> {
}
