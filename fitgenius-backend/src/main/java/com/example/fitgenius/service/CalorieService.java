package com.example.fitgenius.service;

import com.example.fitgenius.model.CalorieEntry;
import com.example.fitgenius.model.User;
import com.example.fitgenius.repository.CalorieEntryRepository;
import com.example.fitgenius.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CalorieService {

    private final CalorieEntryRepository repo;
    private final UserRepository userRepo;

    public CalorieEntry addCalories(String email, CalorieEntry entry) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        entry.setUser(user);
        if (entry.getDate() == null) entry.setDate(java.time.LocalDate.now());
        return repo.save(entry);
    }

    public List<CalorieEntry> getCalories(String email) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return repo.findByUserIdOrderByDateAsc(user.getId());
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
