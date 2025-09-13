package org.example.socialhub.controller;

import lombok.RequiredArgsConstructor;
import org.example.socialhub.entity.User;
import org.example.socialhub.repository.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepo userRepo;

    // get
    @GetMapping("/id/{id}")
    public User get(@PathVariable long id) {
        return userRepo.findById(id).orElse(null);
    }

    @GetMapping("/name/{name}")
    public List<User> get(@PathVariable String name) {
        return userRepo.findByName(name);
    }

    @GetMapping("/all")
    public List<User> getAll() {
        return userRepo.findAll();
    }

    // create/add
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody User user) {
        userRepo.save(user);

        return ResponseEntity.ok("Successfully added");
    }

    // update
    @PutMapping("/upd/{id}")
    public ResponseEntity<String> update(@PathVariable long id, @RequestBody User user) {
        if (!userRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with id " + id + " not found");
        }
        user.setId(id); // we make sure, that we are updating the correct user
        userRepo.save(user);
    
        return ResponseEntity.ok("Successfully updated");
    }

    // delete
    @DeleteMapping("/del/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) {
        if (!userRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with id " + id + " not found");
        }
        userRepo.deleteById(id);

        return ResponseEntity.ok("Successfully deleted");
    }

}
