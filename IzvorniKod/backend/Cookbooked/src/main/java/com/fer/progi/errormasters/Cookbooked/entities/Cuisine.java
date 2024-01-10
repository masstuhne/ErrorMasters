package com.fer.progi.errormasters.Cookbooked.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cuisine", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Recipe> recipes;

    @Override
    public String toString() {
        return "Cuisine{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
