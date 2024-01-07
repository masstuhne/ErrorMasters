package com.fer.progi.errormasters.Cookbooked.repositories;

import com.fer.progi.errormasters.Cookbooked.entities.UserFollow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFollowRepository extends JpaRepository<UserFollow, Integer> {
    List<UserFollow> findAllByFollowerId(Integer followerId);

    boolean existsByFollowerIdAndAuthorId(Integer userId, Integer authorId);
}
