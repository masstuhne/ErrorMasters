package com.fer.progi.errormasters.Cookbooked.models.payloads;

import com.fer.progi.errormasters.Cookbooked.enums.RoleEnum;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserModel {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String username;
    private String password;
    private RoleEnum roleEnum;
}
