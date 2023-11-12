package com.fer.progi.errormasters.Cookbooked.config;

import com.fer.progi.errormasters.Cookbooked.services.security.JpaUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity()
public class SecurityConfig {



    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {




        http.csrf(AbstractHttpConfigurer::disable);
        http.addFilterBefore(null, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }





    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
