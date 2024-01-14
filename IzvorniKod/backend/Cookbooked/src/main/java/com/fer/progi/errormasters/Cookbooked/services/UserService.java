package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.*;
import com.fer.progi.errormasters.Cookbooked.models.payloads.ChatMessageModel;
import com.fer.progi.errormasters.Cookbooked.models.payloads.CommunicationTimeModel;
import com.fer.progi.errormasters.Cookbooked.models.payloads.UserModel;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User getUserById(Integer id);

    User getUserByUsername(String username);

    List<CommunicationTime> getUserCommunicationTimes(Integer userId);
    void addUserCommunicationTime(Integer userId, CommunicationTimeModel communicationTime);

    List<BookmarkedRecipe> getBookmarkedRecipes(Integer userId);
    void bookmarkRecipe(Integer userId, Recipe recipe);

    List<UserFollow> getFollowing(Integer userId);

    List<UserFollow> getFollowers(Integer userId);

    void addFollower(Integer userId, Integer followerId);

    void addFollowing(Integer userId, Integer followingId);

    List<ChatMessage> getChatMessages(Integer userId);

    void addChatMessage(Integer userId, ChatMessageModel chatMessageModel);

    boolean userExistsByUsername(String username);

    boolean userExistsByEmail(String email);

    void addUser(UserModel userModel, Role role);

    void updateUser(Integer userId, UserModel userModel, Role role);

    void saveUser(User user);

    void deleteUser(Integer id);

}
