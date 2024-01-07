package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User getUserByUsername(String username);

    boolean userExistsByUsername(String username);

    boolean userExistsByEmail(String email);

    void saveUser(User user);
}
