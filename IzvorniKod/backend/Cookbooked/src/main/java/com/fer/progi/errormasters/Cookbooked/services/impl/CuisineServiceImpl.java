package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.fer.progi.errormasters.Cookbooked.entities.Cuisine;
import com.fer.progi.errormasters.Cookbooked.repositories.CuisineRepository;
import com.fer.progi.errormasters.Cookbooked.services.CuisineService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CuisineServiceImpl implements CuisineService {


    private final CuisineRepository cuisineRepository;


    @Override
    public List<Cuisine> getAllCuisines() {
        return cuisineRepository.findAll();
    }

    @Override
    public Optional<Cuisine> getCuisineById(Integer id) {
        return cuisineRepository.findById(id);
    }
}
