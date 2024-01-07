package com.fer.progi.errormasters.Cookbooked.controllers;


import com.fer.progi.errormasters.Cookbooked.entities.User;
import com.fer.progi.errormasters.Cookbooked.entities.UserFollow;
import com.fer.progi.errormasters.Cookbooked.models.payloads.UserFollowModel;
import com.fer.progi.errormasters.Cookbooked.models.security.SecurityUserDetails;
import com.fer.progi.errormasters.Cookbooked.services.UserFollowService;
import com.fer.progi.errormasters.Cookbooked.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
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
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{username}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "jwt")
    public String addFollower(@PathVariable String username){
        SecurityUserDetails userDetails = (SecurityUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUserByUsername(userDetails.getUsername());
        UserFollow userFollow = new UserFollow();
        userFollow.setFollower(user);
        User author = userService.getUserByUsername(username);
        if (author == null){
            return "User not found";
        }
        if (Objects.equals(user.getId(), author.getId())){
            return "Can't follow yourself";
        }

        if(userFollowService.doesUserAlreadyFollowAuthor(user.getId(), author.getId())){
            return "Already following";
        }
        userFollow.setAuthor(author);

        Date date = new Date();

        userFollow.setFollowedAt(date);

        userFollowService.saveUserFollow(userFollow);
        return "OK";
    }

}
