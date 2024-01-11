package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.entities.*;
import com.fer.progi.errormasters.Cookbooked.models.payloads.CommunicationTimeModel;
import com.fer.progi.errormasters.Cookbooked.models.payloads.ProfileModel;
import com.fer.progi.errormasters.Cookbooked.models.payloads.UserModel;
import com.fer.progi.errormasters.Cookbooked.models.security.SecurityUserDetails;
import com.fer.progi.errormasters.Cookbooked.services.RecipeService;
import com.fer.progi.errormasters.Cookbooked.services.RoleService;
import com.fer.progi.errormasters.Cookbooked.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController()
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    UserService userService;
    RecipeService recipeService;
    RoleService roleService;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('ROLE_MEMBER ') or hasRole('ROLE_ADMIN')")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<ProfileModel> getUserProfile(){
        SecurityUserDetails user = (SecurityUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userDetails = userService.getUserByUsername(user.getUsername());
        ProfileModel profileModel = new ProfileModel(userDetails.getFirstName(), userDetails.getLastName(), userDetails.getEmail(), userDetails.getPhoneNumber());
        if (Objects.equals(userDetails.getUsername(), "")){
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(profileModel);
        }
    }

    @PutMapping("/profile/update")
    @PreAuthorize("hasRole('ROLE_MEMBER ') or hasRole('ROLE_ADMIN')")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<String> updateUserProfile(@RequestBody ProfileModel profileModel){
        SecurityUserDetails user = (SecurityUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userDetails = userService.getUserByUsername(user.getUsername());
        userDetails.setFirstName(profileModel.getFirstName());
        userDetails.setLastName(profileModel.getLastName());
        userDetails.setEmail(profileModel.getEmail());
        userDetails.setPhoneNumber(profileModel.getPhoneNumber());
        try {
            userService.saveUser(userDetails);
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Greška prilikom spremanja podataka!");
        }
        return ResponseEntity.ok("Podaci uspješno spremljeni!");
    }


    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userService.getAllUsers();

        if (users.isEmpty()){
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(users);
        }
    }

    @GetMapping("/{userId}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<User> getUserById(@PathVariable Integer userId){
        User user = userService.getUserById(userId);

        if (user == null){
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(user);
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<String> addUser(@RequestBody UserModel userModel){
        try {
            Role role = roleService.getRoleByName(userModel.getRoleEnum()).get();
            userService.addUser(userModel, role);

            return ResponseEntity.ok("Korisnik uspješno dodan!");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Greška prilikom dodavanja korisnika!");
        }
    }

    @PutMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<String> updateUser(@PathVariable Integer userId, @RequestBody UserModel userModel){
        try {
            Role role = roleService.getRoleByName(userModel.getRoleEnum()).get();
            userService.updateUser(userId, userModel, role);

            return ResponseEntity.ok("Korisnik uspješno ažuriran!");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Greška prilikom ažuriranja korisnika!");
        }
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<String> deleteUser(@PathVariable Integer userId){
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok("Korisnik uspješno izbrisan!");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Greška prilikom brisanja korisnika!");
        }
    }


    @GetMapping ("/{userId}/recipes")
    public ResponseEntity<List<Recipe>> getRecipesByUserId(@PathVariable Integer userId){
        try {
            List<Recipe> recipes = recipeService.getRecipesByUserId(userId);

            if (recipes.isEmpty()){
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(recipes);
            }
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping ("/{userId}/communication-times")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<List<CommunicationTime>> getUserCommunicationTimes(Integer userId){
        try {
            List<CommunicationTime> communicationTimes = userService.getUserCommunicationTimes(userId);

            if (communicationTimes.isEmpty()){
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(communicationTimes);
            }
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping ("/{userId}/communication-times")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<String> addUserCommunicationTime(Integer userId, @RequestBody CommunicationTimeModel communicationTimeModel){
        try {
            userService.addUserCommunicationTime(userId, communicationTimeModel);
            return ResponseEntity.ok("Vrijeme komunikacije uspješno dodano!");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Greška prilikom dodavanja vremena komunikacije!");
        }
    }

    @GetMapping("{userId}/bookmarked-recipes")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<List<BookmarkedRecipe>> getBookmarkedRecipes(@PathVariable Integer userId){
        try {
            List<BookmarkedRecipe> recipes = userService.getBookmarkedRecipes(userId);

            if (recipes.isEmpty()){
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(recipes);
            }
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/bookmarked-recipes/{bookmarkedRecipeId}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<String> deleteBookmarkedRecipe(@PathVariable Integer bookmarkedRecipeId){
        try {
            SecurityUserDetails user = (SecurityUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User userDetails = userService.getUserByUsername(user.getUsername());
            userService.deleteBookmarkedRecipe(bookmarkedRecipeId,userDetails);
            return ResponseEntity.ok("Spremljeni recept uspješno izbrisan!");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Greška prilikom brisanja spremljenog recepta!");
        }
    }


    @PostMapping("{userId}/bookmarked-recipes")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<String> addBookmarkedRecipe(@PathVariable Integer userId, @RequestParam Integer recipeId){
        try {
            Recipe recipe = recipeService.getRecipeById(recipeId);

            userService.bookmarkRecipe(userId, recipe);
            return ResponseEntity.ok("Recept uspješno spremljen!");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Greška prilikom spremanja recepta!");
        }
    }

}
