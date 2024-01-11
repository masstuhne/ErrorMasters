package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.UserFollow;

import java.util.List;

public interface UserFollowService {

    List<UserFollow> getAllUserFollows();


    List<UserFollow> getAllUserFollowsByFollowerId(Integer followerId);

    void saveUserFollow(UserFollow userFollow);

    boolean doesUserAlreadyFollowAuthor(Integer userId, Integer authorId);

    void deleteUserFollow(Integer id, Integer id1);
}
