package com.example.fitgenius.repository;

import com.example.fitgenius.model.User;
import com.example.fitgenius.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface WorkoutRepository extends JpaRepository<Workout,Long> {
    List<Workout> findByUser(User user);

    List<Workout> findByUserIdOrderByDateAsc(Long userId);


}
