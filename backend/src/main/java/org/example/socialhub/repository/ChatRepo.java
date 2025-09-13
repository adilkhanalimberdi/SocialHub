package org.example.socialhub.repository;

import org.example.socialhub.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepo extends JpaRepository<Chat, Long> {
}
