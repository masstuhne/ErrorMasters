package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.entities.CommunicationTime;
import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.entities.User;
import com.fer.progi.errormasters.Cookbooked.models.payloads.ProfileModel;
import com.fer.progi.errormasters.Cookbooked.models.security.SecurityUserDetails;
import com.fer.progi.errormasters.Cookbooked.services.RecipeService;
import com.fer.progi.errormasters.Cookbooked.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/profile/update")
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
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userService.getAllUsers();

        if (users.isEmpty()){
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(users);
        }
    }


    @GetMapping ("/{userId}/recipes")
    public ResponseEntity<List<Recipe>> getRecipesByUserId(Integer userId){
        return ResponseEntity.ok(recipeService.getRecipesByUserId(userId));
    }

    @GetMapping ("/{userId}/communication-times")
    public ResponseEntity<List<CommunicationTime>> getCommunicationTimesByUserId(Integer userId){
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


}
