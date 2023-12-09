package com.fer.progi.errormasters.Cookbooked.repositories;

import com.fer.progi.errormasters.Cookbooked.entities.UserFollow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFollowRepository extends JpaRepository<UserFollow, Integer> {
}
