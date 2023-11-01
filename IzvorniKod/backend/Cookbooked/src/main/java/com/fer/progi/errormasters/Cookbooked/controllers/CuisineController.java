package com.fer.progi.errormasters.Cookbooked.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cuisines")
public class CuisineController {
    @GetMapping
    public String GetCuisines(){
        return "Returning all cuisines";
    }

    @GetMapping("{id}")
    public String GetCuisine(@PathVariable int id){
        return "Returning the cuisine with id = " + id;
    }
}
