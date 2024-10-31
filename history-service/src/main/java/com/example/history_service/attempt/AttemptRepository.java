package com.example.history_service.attempt;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AttemptRepository extends MongoRepository<Attempt, String> {
    List<Attempt> findByUserId(String userId);
}
