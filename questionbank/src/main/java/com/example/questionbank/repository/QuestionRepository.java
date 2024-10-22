package com.example.questionbank.repository;

import com.example.questionbank.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.questionbank.model.Question;
import com.example.questionbank.model.Complexity;

import java.util.Optional;
import java.util.List;

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

    /**
     * Finds all {@link Question} entities by a given complexity.
     * <p>
     * This method is derived from Spring Data's query creation feature.
     * It generates a query based on the method name to find all questions
     * with the provided complexity.
     * </p>
     *
     * @param complexity the complexity of the questions
     * @return a list of {@link Question} entities with the specified complexity
     */
    List<Question> findQuestionsByComplexity(Complexity complexity);

    /**
     * Finds all {@link Question} entities by a given category.
     * <p>
     * This method is derived from Spring Data's query creation feature.
     * It generates a query based on the method name to find all questions
     * with the provided category.
     * </p>
     *
     * @param category the category of the questions
     * @return a list of {@link Question} entities with the specified category
     */
    List<Question> findQuestionsByCategoriesIsContaining(Category category);
}
