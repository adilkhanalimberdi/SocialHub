package org.example.socialhub.controller;

import lombok.RequiredArgsConstructor;
import org.example.socialhub.entity.Message;
import org.example.socialhub.repository.MessageRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/messages")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageRepo messageRepo;

    // get
    @GetMapping("/{id}")
    public Message getMessage(@PathVariable long id) {
        return messageRepo.findById(id).orElse(null);
    }

    @GetMapping("/all")
    public List<Message> getAllMessages() {
        return messageRepo.findAll();
    }

    // add/create
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Message message) {
        messageRepo.save(message);

        return ResponseEntity.ok("Successfully added");
    }

    @PutMapping("/upd/{id}")
    public ResponseEntity<String> update(@PathVariable long id, @RequestBody Message message) {
        if (!messageRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Message not found");
        }
        message.setId(id);
        messageRepo.save(message);

        return ResponseEntity.ok("Successfully updated");
    }

    // delete
    @DeleteMapping("/del/{id}")
    public ResponseEntity<String> delMessage(@PathVariable long id) {
        if (!messageRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Message not found");
        }
        messageRepo.deleteById(id);

        return ResponseEntity.ok("Successfully deleted");
    }

}
