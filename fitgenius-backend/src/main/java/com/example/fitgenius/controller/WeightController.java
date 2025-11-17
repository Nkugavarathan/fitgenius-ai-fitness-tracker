package com.example.fitgenius.controller;

import com.example.fitgenius.model.WeightEntry;
import com.example.fitgenius.service.WeightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weight")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WeightController {

    private final WeightService service;

    @PostMapping
    public ResponseEntity<WeightEntry> addWeight(Authentication auth, @RequestBody WeightEntry entry) {
        String email = auth.getName();
        return ResponseEntity.ok(service.addWeight(email, entry));
    }

    @GetMapping
    public ResponseEntity<List<WeightEntry>> myWeight(Authentication auth) {
        return ResponseEntity.ok(service.getWeightHistory(auth.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(Authentication auth, @PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
