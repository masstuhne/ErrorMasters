package com.fer.progi.errormasters.Cookbooked.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @GetMapping
    public String GetCategories(){
        return "Returning all categories";
    }

    @GetMapping("{id}")
    public String GetCategory(@PathVariable int id){
        return "Returning the category with id = " + id;
    }
}
