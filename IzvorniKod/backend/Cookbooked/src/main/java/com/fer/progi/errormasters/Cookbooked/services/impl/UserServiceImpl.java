package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.fer.progi.errormasters.Cookbooked.entities.*;
import com.fer.progi.errormasters.Cookbooked.models.payloads.ChatMessageModel;
import com.fer.progi.errormasters.Cookbooked.models.payloads.CommunicationTimeModel;
import com.fer.progi.errormasters.Cookbooked.models.payloads.UserModel;
import com.fer.progi.errormasters.Cookbooked.repositories.BookmarkedRecipeRepository;
import com.fer.progi.errormasters.Cookbooked.repositories.UserRepository;
import com.fer.progi.errormasters.Cookbooked.services.UserService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final BookmarkedRecipeRepository bookmarkedRecipeRepository;

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

        BookmarkedRecipe bookmarkedRecipe = user.getBookmarkedRecipes().stream()
                .filter(bookmarkedRecipe1 -> bookmarkedRecipe1.getRecipe().getId().equals(recipe.getId()))
                .findFirst()
                .orElse(null);

        if (bookmarkedRecipe != null) {
            throw new RuntimeException("Recipe with id " + recipe.getId() + " already bookmarked!");
        }

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
    public List<UserFollow> getFollowing(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            return user.getFollowing();
        } else {
            throw new RuntimeException("User with id " + userId + " not found!");
        }
    }

    @Override
    public List<UserFollow> getFollowers(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            return user.getFollowers();
        } else {
            throw new RuntimeException("User with id " + userId + " not found!");
        }
    }

    @Override
    public void addFollower(Integer userId, Integer followerId) {
        User user = userRepository.findById(userId).orElse(null);
        User follower = userRepository.findById(followerId).orElse(null);

        if (user != null && follower != null) {
            UserFollow newUserFollow = new UserFollow();
            newUserFollow.setAuthor(user);
            newUserFollow.setFollower(follower);
            newUserFollow.setFollowedAt(new Date());

            user.getFollowers().add(newUserFollow);
            userRepository.save(user);
        } else if (user == null) {
            throw new RuntimeException("User with id " + userId + " not found!");
        } else {
            throw new RuntimeException("User with id " + followerId + " not found!");
        }
    }

    @Override
    public void addFollowing(Integer userId, Integer followingId) {
        User user = userRepository.findById(userId).orElse(null);
        User following = userRepository.findById(followingId).orElse(null);

        if (user != null && following != null) {
            UserFollow newUserFollow = new UserFollow();
            newUserFollow.setAuthor(following);
            newUserFollow.setFollower(user);
            newUserFollow.setFollowedAt(new Date());

            user.getFollowing().add(newUserFollow);
            userRepository.save(user);
        } else if (user == null) {
            throw new RuntimeException("User with id " + userId + " not found!");
        } else {
            throw new RuntimeException("User with id " + followingId + " not found!");
        }
    }

    @Override
    public List<ChatMessage> getChatMessages(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            return user.getReceivedMessages();
        } else {
            throw new RuntimeException("User with id " + userId + " not found!");
        }
    }

    @Override
    public void addChatMessage(Integer userId, ChatMessageModel chatMessageModel) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            ChatMessage chatMessage = new ChatMessage();

            if (user.getId() != chatMessageModel.getSenderId()) {
                throw new RuntimeException("UserId in the path and senderId don't match but should because that user is the sender!");
            }

            chatMessage.setSender(user);

            User reciever = userRepository.findById(chatMessageModel.getReceiverId()).orElse(null);

            if (reciever == null) {
                throw new RuntimeException("User reciever with id " + chatMessageModel.getReceiverId() + " not found!");
            }

            chatMessage.setReceiver(reciever);
            chatMessage.setContent(chatMessageModel.getContent());

            user.getSentMessages().add(chatMessage);
            reciever.getReceivedMessages().add(chatMessage);
            userRepository.save(user);
            userRepository.save(reciever);

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
    @Transactional
    public void    deleteBookmarkedRecipe(Integer recipeId, User userDetails) {
        BookmarkedRecipe bookmarkedRecipe = userDetails.getBookmarkedRecipes().stream()
                .filter(bookmarkedRecipe1 -> bookmarkedRecipe1.getRecipe().getId().equals(recipeId))
                .findFirst()
                .orElse(null);

        if (bookmarkedRecipe != null) {
            userDetails.getBookmarkedRecipes().remove(bookmarkedRecipe);
            userRepository.save(userDetails);
            bookmarkedRecipeRepository.deleteById(bookmarkedRecipe.getId());
        } else {
            throw new RuntimeException("Bookmarked recipe with id " + recipeId + " not found!");
        }
    }
}
