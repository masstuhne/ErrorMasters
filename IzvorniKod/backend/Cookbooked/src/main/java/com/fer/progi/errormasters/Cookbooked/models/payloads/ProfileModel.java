package com.fer.progi.errormasters.Cookbooked.models.payloads;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileModel {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;



}
