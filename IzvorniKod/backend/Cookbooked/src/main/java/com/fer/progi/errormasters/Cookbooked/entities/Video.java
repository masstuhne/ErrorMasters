package com.fer.progi.errormasters.Cookbooked.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;

@Data
@Entity
@Table(name = "video")
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("VIDEO")
public class Video extends Media {
    @Column(name = "duration", columnDefinition = "interval")
    private Duration duration;
}
