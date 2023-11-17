package com.fer.progi.errormasters.Cookbooked;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = {
		org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,
})
public class CookbookedApplication {


	public static void main(String[] args) {
		SpringApplication.run(CookbookedApplication.class, args);
	}
}
