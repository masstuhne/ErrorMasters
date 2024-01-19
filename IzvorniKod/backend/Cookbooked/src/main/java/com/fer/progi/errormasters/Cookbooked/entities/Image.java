package com.fer.progi.errormasters.Cookbooked.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "image")
@Data
@AllArgsConstructor
@DiscriminatorValue("IMAGE")
public class Image extends Media {
    @Column(name = "width")
    private int width;

    @Column(name = "height")
    private int height;

    @Column(name = "format")
    private String format;

    public Image() {

    }
}
