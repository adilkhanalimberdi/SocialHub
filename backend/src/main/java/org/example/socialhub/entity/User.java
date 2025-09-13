package org.example.socialhub.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="surname")
    private String surname;

    @Column(name="age")
    private int age;

    @Column(name="email")
    private String email;

    @Column(name="phone_number")
    private String phone;

    @Column(name="updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

}
