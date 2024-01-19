package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.entities.ChatMessage;
import com.fer.progi.errormasters.Cookbooked.models.payloads.ChatMessageModel;
import com.fer.progi.errormasters.Cookbooked.services.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
@AllArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @GetMapping("{chatMessageId}")
    public ResponseEntity<ChatMessage> getChatMessage(@PathVariable Integer chatMessageId) {
        try {
            return ResponseEntity.ok(chatService.getMessage(chatMessageId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().header("Error", e.getMessage()).build();
        }
    }

    @PostMapping
    public ResponseEntity<String> saveChatMessage(@RequestBody ChatMessageModel chatMessage) {
        try {
            chatService.saveMessage(chatMessage);
            return ResponseEntity.ok("Message saved");
        } catch (Exception e) {
            return ResponseEntity.badRequest().header("Error", e.getMessage()).build();
        }
    }

    // Methods for websocket implementation of live chat, not used in the project
//    @MessageMapping("/chat.register")
//    @SendTo("/topic/cookbooked")
//    public ChatMessageModel register(@Payload ChatMessageModel chatMessageModel, SimpMessageHeaderAccessor headerAccessor) {
//        headerAccessor.getSessionAttributes().put("username", chatMessageModel.getSender());
//        return chatMessageModel;
//    }
//
//    @MessageMapping("/chat.send")
//    @SendTo("/topic/cookbooked")
//    public ChatMessageModel sendMessage(@Payload ChatMessageModel chatMessageModel) {
//        return chatMessageModel;
//    }
}
