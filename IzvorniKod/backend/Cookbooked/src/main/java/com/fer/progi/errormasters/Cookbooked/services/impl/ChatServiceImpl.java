package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.fer.progi.errormasters.Cookbooked.entities.ChatMessage;
import com.fer.progi.errormasters.Cookbooked.entities.User;
import com.fer.progi.errormasters.Cookbooked.models.payloads.ChatMessageModel;
import com.fer.progi.errormasters.Cookbooked.models.payloads.ChatMessageWebsocketModel;
import com.fer.progi.errormasters.Cookbooked.repositories.ChatMessageRepository;
import com.fer.progi.errormasters.Cookbooked.repositories.UserRepository;
import com.fer.progi.errormasters.Cookbooked.services.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;

    @Override
    public ChatMessage getMessage(Integer id) {
        ChatMessage chatMessage = chatMessageRepository.findById(id).orElse(null);
        if (chatMessage == null) {
            throw new RuntimeException("Chat message not found");
        }
        return chatMessage;
    }

    @Override
    public void saveMessage(ChatMessageModel message) {
        ChatMessage chatMessage = new ChatMessage();

        User sender = userRepository.findById(message.getSenderId()).orElse(null);
        if (sender == null) {
            throw new RuntimeException("Sender not found");
        }

        User receiver = userRepository.findById(message.getReceiverId()).orElse(null);
        if (receiver == null) {
            throw new RuntimeException("Receiver not found");
        }

        chatMessage.setSender(sender);
        chatMessage.setReceiver(receiver);
        chatMessage.setContent(message.getContent());

        chatMessageRepository.save(chatMessage);
    }
}
