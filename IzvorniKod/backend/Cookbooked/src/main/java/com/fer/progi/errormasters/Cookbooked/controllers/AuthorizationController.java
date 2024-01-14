package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.entities.Role;
import com.fer.progi.errormasters.Cookbooked.entities.User;
import com.fer.progi.errormasters.Cookbooked.enums.RoleEnum;
import com.fer.progi.errormasters.Cookbooked.models.payloads.LoginModel;
import com.fer.progi.errormasters.Cookbooked.models.payloads.RegisterModel;
import com.fer.progi.errormasters.Cookbooked.services.RoleService;
import com.fer.progi.errormasters.Cookbooked.services.UserService;
import com.fer.progi.errormasters.Cookbooked.services.security.AuthorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class AuthorizationController {

    @Autowired
    AuthorizationService authorizationService;

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginModel loginModel){

        try {

            String token = authorizationService.generateToken(loginModel.getUsername().toLowerCase(), loginModel.getPassword());
            return ResponseEntity.ok(token);

        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .badRequest()
                    .body("Pogrešno korisničko ime ili lozinka!");

        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterModel registerModel){
        try {

            String username = registerModel.getUsername().toLowerCase();

            if (userService.userExistsByUsername(username)){
                throw new Exception("Korisničko ime je zauzeto!");
            }
            if (userService.userExistsByEmail(registerModel.getEmail())){
                throw new Exception("Email adresa je zauzeta!");
            }

            User user = new User();
            user.setUsername(username);
            user.setEmail(registerModel.getEmail());
            user.setFirstName(registerModel.getFirstName());
            user.setLastName(registerModel.getLastName());
            user.setPassword(passwordEncoder.encode(registerModel.getPassword()));
            user.setPhoneNumber(registerModel.getPhoneNumber());

            Optional<Role> role = roleService.getRoleByName(RoleEnum.MEMBER);

            user.setRole(role.get());

            userService.saveUser(user);

            return ResponseEntity.ok(String.format("Uspješno ste registirani, %s", username));

        } catch (Exception e){

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }
    }
}
