package com.fer.progi.errormasters.Cookbooked.entities;

import com.fer.progi.errormasters.Cookbooked.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Entity(name = "role")
@Data
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "name", unique = true, nullable = false)
    private RoleEnum name;

    @OneToMany(mappedBy = "role")
    private List<User> users;
}
