package com.fer.progi.errormasters.Cookbooked.controllers;


import com.fer.progi.errormasters.Cookbooked.entities.User;
import com.fer.progi.errormasters.Cookbooked.entities.UserFollow;
import com.fer.progi.errormasters.Cookbooked.models.security.SecurityUserDetails;
import com.fer.progi.errormasters.Cookbooked.services.UserFollowService;
import com.fer.progi.errormasters.Cookbooked.services.UserService;
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

@RestController
@RequestMapping("/follow")
@AllArgsConstructor
public class FollowController {
    UserService userService;
    UserFollowService userFollowService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<UserFollow>> getFollowers(){
        SecurityUserDetails userDetails = (SecurityUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUserByUsername(userDetails.getUsername());
        List<UserFollow> followers = userFollowService.getAllUserFollowsByFollowerId(user.getId());
        return ResponseEntity.ok(followers);
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public String addFollower(@RequestBody String username){
        SecurityUserDetails userDetails = (SecurityUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUserByUsername(userDetails.getUsername());
        UserFollow userFollow = new UserFollow();
        userFollow.setFollower(user);
        User author = userService.getUserByUsername(username);
        if (author == null){
            return "User not found";
        }
        userFollow.setAuthor(author);

        Date date = new Date();

        userFollow.setFollowedAt(date);

        userFollowService.saveUserFollow(userFollow);
        return "OK";
    }

}
