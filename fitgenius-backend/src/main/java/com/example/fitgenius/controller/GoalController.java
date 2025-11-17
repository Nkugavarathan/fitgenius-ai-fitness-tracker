package com.example.fitgenius.controller;

import com.example.fitgenius.model.Goal;
import com.example.fitgenius.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GoalController {

    private final GoalService service;

    @PostMapping
    public ResponseEntity<Goal> create(Authentication auth, @RequestBody Goal goal) {
        return ResponseEntity.ok(service.addGoal(auth.getName(), goal));
    }

    @GetMapping
    public ResponseEntity<List<Goal>> list(Authentication auth) {
        return ResponseEntity.ok(service.getGoals(auth.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Goal> update(Authentication auth, @PathVariable Long id, @RequestBody Goal g) {
        return ResponseEntity.ok(service.updateGoal(auth.getName(), id, g));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(Authentication auth, @PathVariable Long id) {
        service.deleteGoal(auth.getName(), id);
        return ResponseEntity.noContent().build();
    }
}
