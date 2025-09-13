package org.example.socialhub.controller;

import lombok.RequiredArgsConstructor;
import org.example.socialhub.DTO.AddMessageRequest;
import org.example.socialhub.entity.Chat;
import org.example.socialhub.entity.Message;
import org.example.socialhub.entity.User;
import org.example.socialhub.repository.ChatRepo;
import org.example.socialhub.repository.MessageRepo;
import org.example.socialhub.repository.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/chats")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ChatController {

    private final ChatRepo chatRepo;
    private final MessageRepo messageRepo;
    private final UserRepo userRepo;

    // get
    @GetMapping("/{id}")
    public Chat getChat(@PathVariable long id) {
        return chatRepo.findById(id).orElse(null);
    }

    @GetMapping("/all")
    public List<Chat> getAllChats() {
        return chatRepo.findAll();
    }

    @GetMapping("/from-user/{id}")
    public List<Chat> getFromUser(@PathVariable long id) {
        List<Chat> allChats = getAllChats();
        List<Chat> userChats = new ArrayList<>();

        for (Chat chat : allChats) {
            if (chat.getUser1().getId() == id || chat.getUser2().getId() == id) {
                userChats.add(chat);
            }
        }

        return userChats;
    }

    // create/add
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Chat chat) {
        chatRepo.save(chat);

        return ResponseEntity.ok("Successfully added");
    }

    // add a new message to chats array
    @CrossOrigin(origins = "*")
    @PostMapping("/add-message")
    public ResponseEntity<String> addMessage(
            @RequestBody AddMessageRequest request) {
        User sender = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User with id " + request.getUserId() + " not found"));
        Chat chat = chatRepo.findById(request.getChatId())
                .orElseThrow(() -> new RuntimeException("Chat with id " + request.getChatId() + " not found"));
        String msg = request.getMessage();

        Message message = new Message();
        message.setMessage(msg);
        message.setChat(chat);
        message.setSender(sender);

        messageRepo.save(message);

        return ResponseEntity.ok("Successfully added");
    }

    // update
    @PutMapping("/upd/{id}")
    public ResponseEntity<String> upd(@PathVariable long id, @RequestBody Chat chat) {
        if (!chatRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chat with id " + id + " not found");
        }
        chat.setId(id); // we make sure, that we are updating the correct chat
        chatRepo.save(chat);

        return ResponseEntity.ok("Successfully updated");
    }

    // delete
    @DeleteMapping("/del/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) {
        if (!chatRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chat with id " + id + " not found");
        }
        chatRepo.deleteById(id);

        return ResponseEntity.ok("Successfully deleted");
    }

}
