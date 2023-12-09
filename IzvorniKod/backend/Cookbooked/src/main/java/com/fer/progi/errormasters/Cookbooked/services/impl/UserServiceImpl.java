package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.fer.progi.errormasters.Cookbooked.entities.User;
import com.fer.progi.errormasters.Cookbooked.repositories.UserRepository;
import com.fer.progi.errormasters.Cookbooked.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public boolean userExistsByUsername(String username) {
        boolean exists = userRepository.existsByUsername(username);

        return exists;
    }

    @Override
    public boolean userExistsByEmail(String email) {
        boolean exists = userRepository.existsByEmail(email);

        return exists;
    }

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }
}
