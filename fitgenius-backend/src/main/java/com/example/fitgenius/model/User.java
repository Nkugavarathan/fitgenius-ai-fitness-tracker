package com.example.fitgenius.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users") // table name users
@Data                        //  combines @Getter, @Setter, @ToString, @EqualsAndHashCode
@NoArgsConstructor           //  required by JPA
@AllArgsConstructor
@Builder                     //  enables User.builder()
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
}
