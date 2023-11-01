package com.fer.progi.errormasters.Cookbooked.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ingredients")
public class IngredientController {
    @GetMapping
    public String GetIngredients(){
        return "Returning all ingredients";
    }

    @GetMapping("{id}")
    public String GetIngredient(@PathVariable int id){
        return "Returning the ingredient with id = " + id;
    }
}
