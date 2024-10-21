package com.example.questionbank.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.questionbank.model.Question;

import java.util.Optional;

/**
 * Repository interface for managing {@link Question} entities
 * in MongoDB.
 * <p>
 * This interface extends {@link MongoRepository} to provide basic
 * CRUD operations and query capabilities for {@link Question} entities.
 * It includes a custom query method to find questions by their title.
 * </p>
 */
public interface QuestionRepository extends MongoRepository<Question, String> {

    /**
     * Finds a {@link Question} entity by its title.
     * <p>
     * This method is derived from Spring Data's query creation feature.
     * It generates a query based on the method name to find a question
     * by the provided title. If not will throw an error.
     * </p>
     *
     * @param title the title of the question
     * @return the {@link Question} entity with the specified title
     */
    Optional<Question> findQuestionByTitle(String title);

}
