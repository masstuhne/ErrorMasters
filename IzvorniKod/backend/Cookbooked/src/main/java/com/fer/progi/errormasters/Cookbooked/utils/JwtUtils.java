package com.fer.progi.errormasters.Cookbooked.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@Slf4j
public class JwtUtils {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private int jwtExpirationMs;

    private SecretKey getSignKey(){
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }



    public String generateJwtToken(UserDetails userDetails) {
        try {
            return Jwts.builder()
                    .subject((userDetails.getUsername()))
                    .issuedAt(new Date())
                    .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                    .signWith(getSignKey())
                    .claim("role", userDetails.getAuthorities())
                    .compact();
        }
        catch (Exception e){
            log.error(e.getMessage());
            return null;
        }
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public Claims extractAllClaims(String token) {
        try {
            return Jwts.parser().verifyWith(getSignKey()).build().parseSignedClaims(token).getPayload();
        }
        catch (Exception e){
            log.error(e.getMessage());
            return null;
        }
    }




    public boolean validateJwtToken(String authToken, UserDetails userDetails) {
        try {
            final String username = extractUsername(authToken);
            return (username.equals(userDetails.getUsername()) && !isExpired(authToken));
        }
        catch (SignatureException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
        }
        catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        }
        catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        }
        catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        }
        catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;

    }

    private boolean isExpired(String token) {

        extractAllClaims(token);
        return extractAllClaims(token).getExpiration().before(new Date());

    }
}
