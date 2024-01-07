package com.fer.progi.errormasters.Cookbooked.models.payloads;

import com.fer.progi.errormasters.Cookbooked.entities.UserFollow;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class UserFollowModel {
    private Integer authorId;
    private String firstName;
    private String lastName;

    private String phoneNumber;

    private String username;


    public static List<UserFollowModel> convertToModel(List<UserFollow> followers) {
        List<UserFollowModel> followersModel = new ArrayList<>();
        for (UserFollow follower : followers) {
            followersModel.add(new UserFollowModel(follower.getAuthor().getId(), follower.getAuthor().getFirstName(), follower.getAuthor().getLastName(), follower.getAuthor().getPhoneNumber(), follower.getAuthor().getUsername()));
        }
        return followersModel;
    }
}
