package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.CommunicationTime;
import com.fer.progi.errormasters.Cookbooked.entities.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User getUserByUsername(String username);

    List<CommunicationTime> getUserCommunicationTimes(Integer userId);

    boolean userExistsByUsername(String username);

    boolean userExistsByEmail(String email);

    void saveUser(User user);
}
