package com.fer.progi.errormasters.Cookbooked.models.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginModel {

    private String username;
    private String password;
}
