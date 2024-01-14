package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.entities.*;
import com.fer.progi.errormasters.Cookbooked.models.payloads.ChatMessageModel;
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
            return ResponseEntity.badRequest().header("Error", e.getMessage()).body("Greška prilikom spremanja podataka!");
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
    @PreAuthorize("hasRole('ROLE_ADMIN')")
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
            return ResponseEntity.badRequest().header("Error", e.getMessage()).body("Greška prilikom dodavanja korisnika!");
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
            return ResponseEntity.badRequest().header("Error", e.getMessage()).body("Greška prilikom ažuriranja korisnika!");
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
            return ResponseEntity.badRequest().header("Error", e.getMessage()).body("Greška prilikom brisanja korisnika!");
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
            return ResponseEntity.badRequest().header("Error", e.getMessage()).build();
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
            return ResponseEntity.badRequest().header("Error", e.getMessage()).build();
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
            return ResponseEntity.badRequest().header("Error", e.getMessage()).body("Greška prilikom dodavanja vremena komunikacije!");
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
            return ResponseEntity.badRequest().header("Error", e.getMessage()).build();
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
            return ResponseEntity.badRequest().header("Error", e.getMessage()).body("Greška prilikom spremanja recepta!");
        }
    }

    @GetMapping("{userId}/following")
    public ResponseEntity<List<UserFollow>> getFollowing(@PathVariable Integer userId){
        try {
            List<UserFollow> following = userService.getFollowing(userId);

            return ResponseEntity.ok(following);
        } catch (Exception e){
            return ResponseEntity.badRequest().header("Error", e.getMessage()).build();
        }
    }

    @GetMapping("{userId}/followers")
    public ResponseEntity<List<UserFollow>> getFollowers(@PathVariable Integer userId){
        try {
            List<UserFollow> followers = userService.getFollowers(userId);

            return ResponseEntity.ok(followers);
        } catch (Exception e){
            return ResponseEntity.badRequest().header("Error", e.getMessage()).build();
        }
    }

    @GetMapping("{userId}/chat-messages")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<List<ChatMessage>> getChatMessages(@PathVariable Integer userId){
        try {
            List<ChatMessage> chatMessages = userService.getChatMessages(userId);

            return ResponseEntity.ok(chatMessages);
        } catch (Exception e){
            return ResponseEntity.badRequest().header("Error", e.getMessage()).build();
        }
    }

    @PostMapping("{userId}/chat-messages")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<String> addChatMessage(@PathVariable Integer userId, @RequestBody ChatMessageModel chatMessageModel){
        try {
            userService.addChatMessage(userId, chatMessageModel);

            return ResponseEntity.ok("Poruka uspješno poslana!");
        } catch (Exception e){
            return ResponseEntity.badRequest().header("Error", e.getMessage()).body("Greška prilikom slanja poruke!");
        }
    }

//    @PostMapping("{userId}/followers/{followerId}")
//    @PreAuthorize("isAuthenticated()")
//    @SecurityRequirement(name = "jwt")
//    public ResponseEntity<String> addFollower(@PathVariable Integer userId, @PathVariable Integer followerId){
//        try {
//            userService.addFollower(userId, followerId);
//
//            return ResponseEntity.ok("Pratitelj uspješno dodan!");
//        } catch (Exception e){
//            return ResponseEntity.badRequest().body("Greška prilikom dodavanja pratitelja!");
//        }
//    }
//
//    @PostMapping("{userId}/following/{followingId}")
//    @PreAuthorize("isAuthenticated()")
//    @SecurityRequirement(name = "jwt")
//    public ResponseEntity<String> addFollowing(@PathVariable Integer userId, @PathVariable Integer followingId){
//        try {
//            userService.addFollowing(userId, followingId);
//
//            return ResponseEntity.ok("Pratitelj uspješno dodan!");
//        } catch (Exception e){
//            return ResponseEntity.badRequest().body("Greška prilikom dodavanja pratitelja!");
//        }
//    }
}
