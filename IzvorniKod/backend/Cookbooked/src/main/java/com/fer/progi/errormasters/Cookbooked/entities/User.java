package com.fer.progi.errormasters.Cookbooked.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Table(name = "user")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer id;

    @OneToMany
    @Column(name = "roleID")
    private Integer roleId;

    @Column(name = "firstName", nullable = false)
    private String firstName;

    @Column(name = "lastName", nullable = false)
    private String lastName;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", unique = true, nullable = false)
    private String email;
}
