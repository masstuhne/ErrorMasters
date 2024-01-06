package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.User;

import java.util.List;

public interface UserService {
    public List<User> getAllUsers();

    public User getUserByUsername(String username);

    public boolean userExistsByUsername(String username);

    public boolean userExistsByEmail(String email);

    public void saveUser(User user);
}
