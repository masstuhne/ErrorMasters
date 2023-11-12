package com.fer.progi.errormasters.Cookbooked.services.security;


import com.fer.progi.errormasters.Cookbooked.entities.User;
import com.fer.progi.errormasters.Cookbooked.model.security.SecurityUser;
import com.fer.progi.errormasters.Cookbooked.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@AllArgsConstructor
@Service
public class JpaUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);

        return user.map(SecurityUser::new).orElseThrow(() -> new UsernameNotFoundException("User not found"));


    }
}
