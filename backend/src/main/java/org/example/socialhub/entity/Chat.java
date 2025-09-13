package org.example.socialhub.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Entity
@Table(name="chats")
@Slf4j
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Chat {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_1_id")
    private User user1;

    @ManyToOne
    @JoinColumn(name = "user_2_id")
    private User user2;

    @OneToMany(mappedBy="chat", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Message> messages;

}
