package com.example.fitgenius.controller;

import com.example.fitgenius.model.Workout;
import com.example.fitgenius.security.JwtUtil;
import com.example.fitgenius.service.WorkoutService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class WorkoutController {
    private final WorkoutService workoutService;
    private final JwtUtil jwtUtil;

    // post workout
    @PostMapping
    public Workout addWorkout(@RequestBody Workout workout, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }


        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);
        return workoutService.addWorkout(email, workout);
    }


    // get user workout
    @GetMapping
    public List<Workout> getWorkouts(HttpServletRequest request){
        String token=request.getHeader("Authorization").substring(7);
        String email=jwtUtil.extractEmail(token);
        return workoutService.getUserWorkouts(email);
    }

    @PutMapping("/{id}")
    public Workout updateWorkout(@PathVariable Long id,
                                 @RequestBody Workout workout,
                                 HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String email = jwtUtil.extractEmail(token);
        return workoutService.updateWorkout(email, id, workout);
    }

    @DeleteMapping("/{id}")
    public void deleteWorkout(@PathVariable Long id, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String email = jwtUtil.extractEmail(token);
        workoutService.deleteWorkout(email, id);
    }

}
