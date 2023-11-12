package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.models.LoginModel;
import com.fer.progi.errormasters.Cookbooked.services.security.AuthorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthorizationController {

    @Autowired
    AuthorizationService authorizationService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginModel loginModel){

        try{

            String token = authorizationService.generateToken(loginModel.getUsername(), loginModel.getPassword());
            return ResponseEntity.ok(token);

        }catch (Exception e){

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }
    }


}
