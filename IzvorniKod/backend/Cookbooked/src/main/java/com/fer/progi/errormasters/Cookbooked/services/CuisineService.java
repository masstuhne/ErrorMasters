package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.Cuisine;

import java.util.List;
import java.util.Optional;

public interface CuisineService {

    public List<Cuisine> getAllCuisines();

    public Optional<Cuisine> getCuisineById(Integer id);


}
