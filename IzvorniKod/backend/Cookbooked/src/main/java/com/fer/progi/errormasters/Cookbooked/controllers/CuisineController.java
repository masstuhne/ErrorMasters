package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.entities.Cuisine;
import com.fer.progi.errormasters.Cookbooked.services.CuisineService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cuisines")
@AllArgsConstructor
public class CuisineController {

    private final CuisineService cuisineService;
    @GetMapping
    public ResponseEntity<List<Cuisine>> GetCuisines(){
        List<Cuisine> cuisines = cuisineService.getAllCuisines();
        if (cuisines.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(cuisines);
    }

    @GetMapping("{id}")
    public ResponseEntity<Cuisine> GetCuisine(@PathVariable int id){
        Optional<Cuisine> cuisine = cuisineService.getCuisineById(id);
        if(cuisine.isPresent()){
            return ResponseEntity.ok(cuisine.get());
        }
        return ResponseEntity.notFound().build();
    }
}
