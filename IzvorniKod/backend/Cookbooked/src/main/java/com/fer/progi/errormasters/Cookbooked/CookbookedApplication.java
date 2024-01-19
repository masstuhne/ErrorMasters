package com.fer.progi.errormasters.Cookbooked;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = {
		org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,
})
@SecurityScheme(name = "jwt", type = SecuritySchemeType.HTTP, bearerFormat = "JWT", scheme = "bearer")
public class CookbookedApplication {


	public static void main(String[] args) {
		SpringApplication.run(CookbookedApplication.class, args);
	}
}
