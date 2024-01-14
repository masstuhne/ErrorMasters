package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.ChatMessage;
import com.fer.progi.errormasters.Cookbooked.models.payloads.ChatMessageModel;
import com.fer.progi.errormasters.Cookbooked.models.payloads.ChatMessageWebsocketModel;

public interface ChatService {
    ChatMessage getMessage(Integer id);
    void saveMessage(ChatMessageModel message);
}
