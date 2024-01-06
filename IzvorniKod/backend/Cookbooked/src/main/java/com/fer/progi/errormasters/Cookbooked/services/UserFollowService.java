package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.UserFollow;

import java.util.List;

public interface UserFollowService {

    public List<UserFollow> getAllUserFollows();


    public List<UserFollow> getAllUserFollowsByFollowerId(Integer followerId);

    void saveUserFollow(UserFollow userFollow);
}
