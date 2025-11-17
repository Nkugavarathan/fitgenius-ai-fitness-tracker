package com.example.fitgenius.service;

import com.example.fitgenius.model.WeightEntry;
import com.example.fitgenius.model.User;
import com.example.fitgenius.repository.UserRepository;
import com.example.fitgenius.repository.WeightEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WeightService {

    private final WeightEntryRepository weightRepo;
    private final UserRepository userRepo;

    public WeightEntry addWeight(String email, WeightEntry entry) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        entry.setUser(user);
        if (entry.getDate() == null) entry.setDate(java.time.LocalDate.now());
        return weightRepo.save(entry);
    }

    public List<WeightEntry> getWeightHistory(String email) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return weightRepo.findByUserIdOrderByDateAsc(user.getId());
    }

    public void delete(Long id) {
        weightRepo.deleteById(id);
    }
}
