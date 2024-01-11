package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.fer.progi.errormasters.Cookbooked.entities.*;
import com.fer.progi.errormasters.Cookbooked.models.payloads.CommunicationTimeModel;
import com.fer.progi.errormasters.Cookbooked.models.payloads.UserModel;
import com.fer.progi.errormasters.Cookbooked.repositories.UserRepository;
import com.fer.progi.errormasters.Cookbooked.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
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
    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
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
    public void addUserCommunicationTime(Integer userId, CommunicationTimeModel communicationTime) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            CommunicationTime newCommunicationTime = new CommunicationTime();
            newCommunicationTime.setUser(user);
            newCommunicationTime.setStart(communicationTime.getStart());
            newCommunicationTime.setEnd(communicationTime.getEnd());

            user.getCommunicationTimes().add(newCommunicationTime);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User with id " + userId + " not found!");
        }
    }

    @Override
    public List<BookmarkedRecipe> getBookmarkedRecipes(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            return user.getBookmarkedRecipes();
        } else {
            throw new RuntimeException("User with id " + userId + " not found!");
        }
    }

    @Override
    public void bookmarkRecipe(Integer userId, Recipe recipe) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            BookmarkedRecipe newBookmarkedRecipe = new BookmarkedRecipe();
            newBookmarkedRecipe.setUser(user);
            newBookmarkedRecipe.setRecipe(recipe);
            newBookmarkedRecipe.setCreatedAt(new Date());

            user.getBookmarkedRecipes().add(newBookmarkedRecipe);
            userRepository.save(user);
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
    public void addUser(UserModel userModel, Role role) {
        User user = new User();
        user.setUsername(userModel.getUsername());
        user.setEmail(userModel.getEmail());
        user.setFirstName(userModel.getFirstName());
        user.setLastName(userModel.getLastName());
        user.setPassword(userModel.getPassword());
        user.setPhoneNumber(userModel.getPhoneNumber());
        user.setRole(role);

        userRepository.save(user);
    }

    @Override
    public void updateUser(Integer userId, UserModel userModel, Role role) {
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            throw new RuntimeException("User with id " + userId + " not found!");
        }

        user.setUsername(userModel.getUsername());
        user.setEmail(userModel.getEmail());
        user.setFirstName(userModel.getFirstName());
        user.setLastName(userModel.getLastName());
        user.setPassword(userModel.getPassword());
        user.setPhoneNumber(userModel.getPhoneNumber());
        user.setRole(role);

        userRepository.save(user);
    }

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public void deleteBookmarkedRecipe(Integer bookmarkedRecipeId, User userDetails) {
        BookmarkedRecipe bookmarkedRecipe = userDetails.getBookmarkedRecipes().stream()
                .filter(bookmarkedRecipe1 -> bookmarkedRecipe1.getId().equals(bookmarkedRecipeId))
                .findFirst()
                .orElse(null);

        if (bookmarkedRecipe != null) {
            userDetails.getBookmarkedRecipes().remove(bookmarkedRecipe);
            userRepository.save(userDetails);
        } else {
            throw new RuntimeException("Bookmarked recipe with id " + bookmarkedRecipeId + " not found!");
        }
    }
}
