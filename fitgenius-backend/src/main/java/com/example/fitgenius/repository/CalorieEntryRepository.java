package com.example.fitgenius.repository;

import com.example.fitgenius.model.CalorieEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CalorieEntryRepository extends JpaRepository<CalorieEntry, Long> {
    List<CalorieEntry> findByUserIdOrderByDateAsc(Long userId);
}
