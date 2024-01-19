package com.fer.progi.errormasters.Cookbooked.models.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatMessageModel {
    private Integer senderId;
    private Integer receiverId;
    private String content;
}
