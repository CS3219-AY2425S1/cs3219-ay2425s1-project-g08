package com.example.questionbank.service;

import com.example.questionbank.commons.QuestionNotFoundException;
import com.example.questionbank.commons.QuestionWithTitleNotFoundException;
import com.example.questionbank.commons.RandomQuestionNotFoundException;
import com.example.questionbank.model.Category;
import com.example.questionbank.model.Question;
import com.example.questionbank.model.Complexity;

import java.util.List;
import java.util.Set;

/**
 * Service interface for managing {@link Question} entities.
 * <p>
 * This interface defines methods for CRUD operations and any
 * additional business logic related to questions.
 *
 */
public interface QuestionServiceInterface {

    /**
     * Retrieves all questions.
     *
     * @return a list of all {@link Question} entities
     */
    List<Question> getAllQuestions();

    /**
     * Retrieves all questions with a given complexity.
     *
     * @param complexity the complexity level of the questions to retrieve
     * @return a list of all {@link Question} entities with a given complexity.
     */
    List<Question> getAllQuestionsByComplexity(Complexity complexity);

    /**
     * Retrieves all questions with a given category.
     *
     * @param category the category of the questions to retrieve
     * @return a list of all {@link Question} entities with a given category.
     */
    List<Question> getAllQuestionsByCategory(Category category);

    /**
     * Retrieves all questions with a given category and complexity.
     *
     * @param category the category of the questions to retrieve
     * @param complexity the complexity level of the questions to retrieve
     * @return a list of all {@link Question} entities with a given category
     * and complexity.
     */
    List<Question> getAllQuestionsByCategoryAndComplexity(
            Category category,
            Complexity complexity
    );

    /**
     * Retrieves a question by its ID.
     *
     * @param id the ID of the question to retrieve
     * @return the {@link Question} entity with the specified ID
     * @throws QuestionNotFoundException if no question is found with the
     * specified ID
     */
    Question getQuestionById(String id) throws QuestionNotFoundException;

    /**
     * Retrieves a question by its title.
     *
     * @param title the title of the question to retrieve
     * @return the {@link Question} entity with the specified title
     * @throws QuestionNotFoundException if no question is found with the
     * specified title
     */
    Question getQuestionByTitle(String title)
            throws QuestionWithTitleNotFoundException;

    /**
     * Creates a new question.
     *
     * @param question the {@link Question} entity to create
     * @return the created {@link Question} entity
     */
    Question createQuestion(Question question);

    /**
     * Updates an existing question.
     *
     * @param id the ID of the question to update
     * @param updatedQuestion the updated {@link Question} entity
     * @return the updated {@link Question} entity
     * @throws QuestionNotFoundException if no question is found with the
     * specified ID
     */
    Question updateQuestion(String id, Question updatedQuestion)
            throws QuestionNotFoundException;

    /**
     * Deletes a question by its ID.
     *
     * @param id the ID of the question to delete
     * @throws QuestionNotFoundException if no question is found with the
     * specified ID
     */
    void deleteQuestion(String id) throws QuestionNotFoundException;

    /**
     * Retrieves all unique categories for which there are questions in the
     * database.
     *
     * @return a set of unique categories
     */
    Set<Category> getUniqueCategoriesWithQuestions();

    /**
     * Retrieves one question by its category and complexity.
     *
     * @param category the category of the questions to retrieve
     * @param complexity the complexity level of the questions to retrieve
     * @return a list of all {@link Question} entities with a given category
     * and complexity.
     */
    Question getRandomQuestionByCategoryAndComplexity(
            Category category, Complexity complexity)
            throws RandomQuestionNotFoundException;
}
