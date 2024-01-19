package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fer.progi.errormasters.Cookbooked.filters.JwtAuthFilter;
import com.fer.progi.errormasters.Cookbooked.models.payloads.LoginModel;
import com.fer.progi.errormasters.Cookbooked.services.RoleService;
import com.fer.progi.errormasters.Cookbooked.services.UserService;
import com.fer.progi.errormasters.Cookbooked.services.security.AuthorizationService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(controllers = AuthorizationController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthorizationControllerTest {
    @MockBean
    AuthorizationService authorizationService;

    @MockBean
    UserService userService;

    @MockBean
    RoleService roleService;

    @MockBean
    PasswordEncoder passwordEncoder;

    @MockBean
    JwtAuthFilter jwtAuthFilter;

    @InjectMocks
    AuthorizationController authorizationController;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private LoginModel validLoginModel = new LoginModel("valid", "valid");
    private LoginModel invalidLoginModel = new LoginModel("invalid", "invalid");

    @Test
    public void AuthorizationController_Login_ReturnIsOk() throws Exception {
        String expectedToken = "generatedToken";
        Mockito.when(authorizationService.generateToken(validLoginModel.getUsername(), validLoginModel.getPassword()))
                .thenReturn(expectedToken);

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validLoginModel)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string(expectedToken));
    }

    @Test
    public void AuthorizationController_Login_ReturnBadRequest() throws Exception {
        Mockito.when(authorizationService.generateToken(invalidLoginModel.getUsername(), invalidLoginModel.getPassword()))
                .thenThrow(new BadCredentialsException(""));

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidLoginModel)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}