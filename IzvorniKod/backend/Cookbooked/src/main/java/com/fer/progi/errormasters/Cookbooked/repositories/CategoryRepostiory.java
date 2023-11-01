package com.fer.progi.errormasters.Cookbooked.repositories;

import com.fer.progi.errormasters.Cookbooked.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepostiory extends JpaRepository<Category, Integer> {
}
