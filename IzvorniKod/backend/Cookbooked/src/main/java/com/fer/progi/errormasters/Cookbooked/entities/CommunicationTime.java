package com.fer.progi.errormasters.Cookbooked.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "communication_time")
public class CommunicationTime {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @Column(name = "start")
    private Date start;

    @Column(name = "end")
    private Date end;

    @Override
    public String toString() {
        return "CommunicationTime{" +
                "id=" + id +
                ", start=" + start +
                ", end=" + end +
                '}';
    }
}
