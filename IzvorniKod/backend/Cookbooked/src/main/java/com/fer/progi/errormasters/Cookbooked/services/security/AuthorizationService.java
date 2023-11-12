package com.fer.progi.errormasters.Cookbooked.services.security;

import com.fer.progi.errormasters.Cookbooked.models.security.SecurityUser;
import com.fer.progi.errormasters.Cookbooked.utils.JwtUtils;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@Data
public class AuthorizationService {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JpaUserDetailsService userDetailsService;
    @Autowired
    JwtUtils jwtUtils;

    public String generateToken(String username, String password) throws BadCredentialsException {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (BadCredentialsException e){
            throw new BadCredentialsException("Incorrect username or password!", e);
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        String jwt = jwtUtils.generateJwtToken(userDetails);

        return jwt;
    }

}
