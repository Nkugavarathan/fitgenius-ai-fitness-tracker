package com.example.fitgenius.controller;

import com.example.fitgenius.model.CalorieEntry;
import com.example.fitgenius.service.CalorieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calories")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CalorieController {

    private final CalorieService service;

    @PostMapping
    public ResponseEntity<CalorieEntry> add(Authentication auth, @RequestBody CalorieEntry entry) {
        return ResponseEntity.ok(service.addCalories(auth.getName(), entry));
    }

    @GetMapping
    public ResponseEntity<List<CalorieEntry>> get(Authentication auth) {
        return ResponseEntity.ok(service.getCalories(auth.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
