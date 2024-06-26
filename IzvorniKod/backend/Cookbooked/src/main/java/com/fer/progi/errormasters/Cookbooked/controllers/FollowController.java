package com.fer.progi.errormasters.Cookbooked.controllers;


import com.fer.progi.errormasters.Cookbooked.entities.User;
import com.fer.progi.errormasters.Cookbooked.entities.UserFollow;
import com.fer.progi.errormasters.Cookbooked.models.payloads.UserFollowModel;
import com.fer.progi.errormasters.Cookbooked.models.security.SecurityUserDetails;
import com.fer.progi.errormasters.Cookbooked.services.UserFollowService;
import com.fer.progi.errormasters.Cookbooked.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/follow")
@AllArgsConstructor
public class FollowController {
    UserService userService;
    UserFollowService userFollowService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<List<UserFollowModel>> getFollowers(){
        try {
            SecurityUserDetails userDetails = (SecurityUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = userService.getUserByUsername(userDetails.getUsername());
            List<UserFollow> followers = userFollowService.getAllUserFollowsByFollowerId(user.getId());
            List<UserFollowModel> followersModelList = UserFollowModel.convertToModel(followers);

            return ResponseEntity.ok(followersModelList);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().header("Error", e.getMessage()).build();
        }
    }

    @PostMapping("/{username}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<String> addFollower(@PathVariable String username){
        SecurityUserDetails userDetails = (SecurityUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUserByUsername(userDetails.getUsername());
        UserFollow userFollow = new UserFollow();
        userFollow.setFollower(user);
        User author = userService.getUserByUsername(username);
        if (author == null){
            return ResponseEntity.badRequest().body("Username doesn't exist");
        }
        if (Objects.equals(user.getId(), author.getId())){
            return ResponseEntity.badRequest().body("You can't follow yourself");
        }

        if(userFollowService.doesUserAlreadyFollowAuthor(user.getId(), author.getId())){

            return new ResponseEntity<>("You already follow this user", HttpStatus.CONFLICT);
        }
        userFollow.setAuthor(author);

        Date date = new Date();

        userFollow.setFollowedAt(date);

        userFollowService.saveUserFollow(userFollow);
        return ResponseEntity.ok("You are now following " + username);
    }

    @DeleteMapping("/{username}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "jwt")
    public ResponseEntity<String> deleteFollower(@PathVariable String username){
        SecurityUserDetails userDetails = (SecurityUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUserByUsername(userDetails.getUsername());
        User author = userService.getUserByUsername(username);
        if (author == null){
            return ResponseEntity.badRequest().body("Username doesn't exist");
        }
        if (Objects.equals(user.getId(), author.getId())){
            return ResponseEntity.badRequest().body("You can't unfollow yourself");
        }
        if(!userFollowService.doesUserAlreadyFollowAuthor(user.getId(), author.getId())){
            return ResponseEntity.badRequest().body("You don't follow this user");
        }
        userFollowService.deleteUserFollow(user.getId(), author.getId());
        return ResponseEntity.ok("You are no longer following " + username);
    }

}
