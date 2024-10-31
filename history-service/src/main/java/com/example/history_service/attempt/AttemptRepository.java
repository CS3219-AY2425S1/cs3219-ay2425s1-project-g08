package com.example.history_service.attempt;

import com.example.history_service.attempt.models.Attempt;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AttemptRepository extends MongoRepository<Attempt, String> {
    List<Attempt> findByUserId(String userId);
}
