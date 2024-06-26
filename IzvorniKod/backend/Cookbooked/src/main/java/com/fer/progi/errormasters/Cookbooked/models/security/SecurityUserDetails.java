package com.fer.progi.errormasters.Cookbooked.models.security;

import com.fer.progi.errormasters.Cookbooked.entities.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@AllArgsConstructor
public class SecurityUserDetails implements UserDetails {
    private final User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String ROLE_PREFIX = "ROLE_";
        return List.of(new SimpleGrantedAuthority(ROLE_PREFIX + user.getRole().getName().toString()));
    }

    public Integer getId() {
        return user.getId();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
