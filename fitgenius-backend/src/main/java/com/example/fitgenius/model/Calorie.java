package com.example.fitgenius.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Calorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer calories;  // user enters calories eaten

    private LocalDate date;  // which day

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
