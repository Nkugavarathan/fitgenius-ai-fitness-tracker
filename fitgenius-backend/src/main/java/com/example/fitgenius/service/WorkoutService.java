package com.example.fitgenius.service;

import com.example.fitgenius.model.User;
import com.example.fitgenius.model.Workout;
import com.example.fitgenius.repository.UserRepository;
import com.example.fitgenius.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutService {
    private final WorkoutRepository workoutRepository;
    private final UserRepository userRepository;


// add workout for user
public Workout addWorkout(String email,Workout workout){
    User user=userRepository.findByEmail(email).orElseThrow();
    workout.setUser(user);
    workout.setDate(LocalDate.now());
    System.out.println("Received workout: " + workout.getExerciseName());
    System.out.println("For user: " + email);
    return workoutRepository.save(workout);
}
    //get user workouts
//    public List<Workout> getUserWorkouts(String email){
//        User user=userRepository.findByEmail(email).orElseThrow();
//        return workoutRepository.findByUser(user);
//    }

    public List<Workout> getUserWorkouts(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return workoutRepository.findByUserIdOrderByDateAsc(user.getId());
    }
    //  Update workout
    public Workout updateWorkout(String email, Long workoutId, Workout updatedWorkout) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found"));

        // Ensure the workout belongs to this user
        if (!workout.getUser().equals(user)) {
            throw new RuntimeException("Unauthorized update");
        }

        // Update fields
        workout.setExerciseName(updatedWorkout.getExerciseName());
        workout.setSets(updatedWorkout.getSets());
        workout.setReps(updatedWorkout.getReps());
        workout.setDate(updatedWorkout.getDate());

        return workoutRepository.save(workout);
    }

    //  Delete workout
    public void deleteWorkout(String email, Long workoutId) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found"));

        // Ensure the workout belongs to this user
        if (!workout.getUser().equals(user)) {
            throw new RuntimeException("Unauthorized delete");
        }

        workoutRepository.delete(workout);
    }
}


