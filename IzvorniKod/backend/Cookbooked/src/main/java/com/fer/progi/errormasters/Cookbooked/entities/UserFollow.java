package com.fer.progi.errormasters.Cookbooked.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_follow")
public class UserFollow {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "follower_id")
    private User follower;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    @Column(name = "followed_at")
    private Date followedAt = new Date();

    @Override
    public String toString() {
        return "UserFollow{" +
                "id=" + id +
                ", followedAt=" + followedAt +
                '}';
    }
}
