package com.fer.progi.errormasters.Cookbooked.utils;

import com.fer.progi.errormasters.Cookbooked.models.security.SecurityUser;
import com.fer.progi.errormasters.Cookbooked.services.security.JpaUserDetailsService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@Slf4j
public class JwtUtils {

    @Value("${jwt.secret}")
    private SecretKey jwtSecret;

    @Value("${jwt.expiration}")
    private int jwtExpirationMs;



    public String generateJwtToken(UserDetails userDetails) {
        return Jwts.builder()
                .subject((userDetails.getUsername()))
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(jwtSecret)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser().decryptWith(jwtSecret).build().parseEncryptedClaims(token).getPayload().getSubject();
    }




    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().decryptWith(jwtSecret).build().parseEncryptedClaims(authToken);
            return true;
        } catch (SignatureException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims empty: {}", e.getMessage());
        }

        return false;

    }
}
