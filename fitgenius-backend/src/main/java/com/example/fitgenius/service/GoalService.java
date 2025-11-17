package com.example.fitgenius.service;

import com.example.fitgenius.model.Goal;
import com.example.fitgenius.model.User;
import com.example.fitgenius.repository.GoalRepository;
import com.example.fitgenius.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository repo;
    private final UserRepository userRepo;

    public Goal addGoal(String email, Goal goal) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        goal.setUser(user);
        return repo.save(goal);
    }

    public List<Goal> getGoals(String email) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return repo.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    public Goal updateGoal(String email, Long goalId, Goal update) {
        Goal existing = repo.findById(goalId).orElseThrow(() -> new RuntimeException("Goal not found"));
        if (!existing.getUser().getEmail().equals(email)) throw new RuntimeException("Forbidden");
        existing.setTitle(update.getTitle());
        existing.setDescription(update.getDescription());
        existing.setTargetDate(update.getTargetDate());
        existing.setAchieved(update.getAchieved());
        return repo.save(existing);
    }

    public void deleteGoal(String email, Long goalId) {
        Goal existing = repo.findById(goalId).orElseThrow(() -> new RuntimeException("Goal not found"));
        if (!existing.getUser().getEmail().equals(email)) throw new RuntimeException("Forbidden");
        repo.deleteById(goalId);
    }
}
