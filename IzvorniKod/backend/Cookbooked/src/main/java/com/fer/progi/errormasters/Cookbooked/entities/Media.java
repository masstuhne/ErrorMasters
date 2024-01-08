package com.fer.progi.errormasters.Cookbooked.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fer.progi.errormasters.Cookbooked.enums.MediaTypeEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "media")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "media_type", discriminatorType = DiscriminatorType.STRING)
public class Media {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    @JsonIgnore
    private Recipe recipe;

    @Column(name = "key", nullable = false, unique = true)
    private String key;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "upload_date")
    private Date uploadDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "media_type", nullable = false, insertable = false, updatable = false)
    private MediaTypeEnum mediaType;
}
