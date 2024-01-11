package com.fer.progi.errormasters.Cookbooked.config;

import com.fer.progi.errormasters.Cookbooked.converters.StringEmptyMultipartConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.Formatter;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {


    @Bean
    public WebMvcConfigurer webConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
                        .allowedHeaders("*");
            }

            @Override
            public void addFormatters(FormatterRegistry registry) {
                registry.addConverter(new StringEmptyMultipartConverter());
                WebMvcConfigurer.super.addFormatters(registry);
            }
        };
    }
}
