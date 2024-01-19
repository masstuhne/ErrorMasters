package com.fer.progi.errormasters.Cookbooked.models.payloads;

import lombok.Data;

@Data
public class RegisterModel {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
}
