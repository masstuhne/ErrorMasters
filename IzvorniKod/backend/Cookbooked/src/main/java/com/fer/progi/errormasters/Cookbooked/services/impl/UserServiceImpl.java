package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.fer.progi.errormasters.Cookbooked.entities.CommunicationTime;
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
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    @Override
    public List<CommunicationTime> getUserCommunicationTimes(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            return user.getCommunicationTimes();
        } else {
            throw new RuntimeException("User with id " + userId + " not found!");
        }
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
