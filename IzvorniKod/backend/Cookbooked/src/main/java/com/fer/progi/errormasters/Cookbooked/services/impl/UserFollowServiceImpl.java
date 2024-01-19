package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.fer.progi.errormasters.Cookbooked.entities.UserFollow;
import com.fer.progi.errormasters.Cookbooked.repositories.UserFollowRepository;
import com.fer.progi.errormasters.Cookbooked.services.UserFollowService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserFollowServiceImpl implements UserFollowService {

    UserFollowRepository userFollowRepository;


    @Override
    public List<UserFollow> getAllUserFollows() {
        return userFollowRepository.findAll();
    }

    @Override
    public List<UserFollow> getAllUserFollowsByFollowerId(Integer followerId) {
        return userFollowRepository.findAllByFollowerId(followerId);
    }

    @Override
    public void saveUserFollow(UserFollow userFollow) {
        userFollowRepository.save(userFollow);
    }

    @Override
    public boolean doesUserAlreadyFollowAuthor(Integer userId, Integer authorId) {
        return userFollowRepository.existsByFollowerIdAndAuthorId(userId, authorId);
    }

    @Override
    @Transactional
    public void deleteUserFollow(Integer id, Integer id1) {
        userFollowRepository.deleteByFollowerIdAndAuthorId(id, id1);
    }
}
