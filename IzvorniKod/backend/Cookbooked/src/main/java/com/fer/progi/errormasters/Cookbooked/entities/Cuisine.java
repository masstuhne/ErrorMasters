package com.fer.progi.errormasters.Cookbooked.entities;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "cuisine")
@Data
public class Cuisine {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "cuisine", cascade = CascadeType.ALL)
    private List<Recipe> recipes;
}
