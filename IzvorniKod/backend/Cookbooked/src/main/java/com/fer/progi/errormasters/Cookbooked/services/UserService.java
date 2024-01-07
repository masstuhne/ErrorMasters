package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.BookmarkedRecipe;
import com.fer.progi.errormasters.Cookbooked.entities.CommunicationTime;
import com.fer.progi.errormasters.Cookbooked.entities.Recipe;
import com.fer.progi.errormasters.Cookbooked.entities.User;
import com.fer.progi.errormasters.Cookbooked.models.payloads.CommunicationTimeModel;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User getUserByUsername(String username);

    List<CommunicationTime> getUserCommunicationTimes(Integer userId);
    void addUserCommunicationTime(Integer userId, CommunicationTimeModel communicationTime);

    List<BookmarkedRecipe> getBookmarkedRecipes(Integer userId);
    void bookmarkRecipe(Integer userId, Recipe recipe);

    boolean userExistsByUsername(String username);

    boolean userExistsByEmail(String email);

    void saveUser(User user);
}
