package com.example.fitgenius.controller;

import com.example.fitgenius.model.CalorieEntry;
import com.example.fitgenius.model.WeightEntry;
import com.example.fitgenius.model.Workout;
import com.example.fitgenius.model.Goal;
import com.example.fitgenius.repository.WorkoutRepository;
import com.example.fitgenius.service.CalorieService;
import com.example.fitgenius.service.WeightService;
import com.example.fitgenius.service.GoalService;
import com.example.fitgenius.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {

    private final WeightService weightService;
    private final CalorieService calorieService;
    private final GoalService goalService;
    private final WorkoutRepository workoutRepo;
    private final UserRepository userRepo;

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> summary(Authentication auth) {
        String email = auth.getName();

        // Weight history
        List<WeightEntry> weights = weightService.getWeightHistory(email);

// FIX: Explicitly cast the result of Map.of() to the generic type Map<String, Object>
        List<Map<String, Object>> weightSeries = weights.stream()
                .<Map<String, Object>>map(w -> Map.of("date", w.getDate().toString(), "weight", w.getWeight()))
                .collect(Collectors.toList());

        // Calories series (last 14 days)
        List<CalorieEntry> calories = calorieService.getCalories(email);
        Map<String, Integer> caloriesByDate = calories.stream()
                .collect(Collectors.groupingBy(c -> c.getDate().toString(), Collectors.summingInt(CalorieEntry::getCalories)));

        // Workouts count by date (last 14 days)
        var user = userRepo.findByEmail(email).orElseThrow();
//  Using the method defined in your WorkoutRepository
        List<Workout> workouts = workoutRepo.findByUserIdOrderByDateAsc(user.getId());
        Map<String, Long> workoutsByDate = workouts.stream()
                .collect(Collectors.groupingBy(w -> w.getDate().toString(), Collectors.counting()));
        // Goals
        List<Goal> goals = goalService.getGoals(email);

        Map<String, Object> resp = new HashMap<>();
        resp.put("weightSeries", weightSeries);
        resp.put("caloriesByDate", caloriesByDate);
        resp.put("workoutsByDate", workoutsByDate);
        resp.put("goals", goals);

        return ResponseEntity.ok(resp);
    }
}
