package com.example.history_service.attempt;

import com.example.history_service.attempt.models.Attempt;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Repository interface for performing CRUD operations on Attempt documents
 * in MongoDb.
 *
 * The query method is defined by the method naming defined by the spring data.
 */
public interface AttemptRepository extends MongoRepository<Attempt, String> {
    /**
     * Finds all attempts associated with a specific user.
     *
     * @param userId the unique identifier of the user whose attempts are to
     *               be retrieved
     * @return a list of Attempt objects associated with the specific userId
     */
    List<Attempt> findByUserId(String userId);
}
