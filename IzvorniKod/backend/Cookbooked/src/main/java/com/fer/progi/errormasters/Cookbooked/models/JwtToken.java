package com.fer.progi.errormasters.Cookbooked.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtToken {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String role;


}
