package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.entities.Role;
import com.fer.progi.errormasters.Cookbooked.entities.User;
import com.fer.progi.errormasters.Cookbooked.enums.RoleEnum;
import com.fer.progi.errormasters.Cookbooked.models.LoginModel;
import com.fer.progi.errormasters.Cookbooked.models.RegisterModel;
import com.fer.progi.errormasters.Cookbooked.repositories.RoleRepository;
import com.fer.progi.errormasters.Cookbooked.repositories.UserRepository;
import com.fer.progi.errormasters.Cookbooked.services.RoleService;
import com.fer.progi.errormasters.Cookbooked.services.UserService;
import com.fer.progi.errormasters.Cookbooked.services.security.AuthorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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

        try{

            String token = authorizationService.generateToken(loginModel.getUsername(), loginModel.getPassword());
            return ResponseEntity.ok(token);

        }catch (Exception e){

            if(e.getMessage().equals("Incorrect username or password!")) //TODO ne usporedjivati message nego catchati bas taj exception
                return ResponseEntity
                        .badRequest()
                        .body("Pogrešno korisničko ime ili lozinka!");

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterModel registerModel){
        try {

            if (userService.userExistsByUsername(registerModel.getUsername())){
                throw new Exception("Korisničko ime je zauzeto!");
            }
            if (userService.userExistsByEmail(registerModel.getEmail())){
                throw new Exception("Email adresa je zauzeta!");
            }

            User user = new User();
            user.setUsername(registerModel.getUsername());
            user.setEmail(registerModel.getEmail());
            user.setFirstName(registerModel.getFirstName());
            user.setLastName(registerModel.getLastName());
            user.setPassword(passwordEncoder.encode(registerModel.getPassword()));
            user.setPhoneNumber(registerModel.getPhoneNumber());

            Optional<Role> role = roleService.getRoleByName(RoleEnum.MEMBER);

            user.setRole(role.get());

            userService.saveUser(user);

            return ResponseEntity.ok(String.format("Uspješno ste registirani, %s", registerModel.getUsername()));

        } catch (Exception e){

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }
    }


}
