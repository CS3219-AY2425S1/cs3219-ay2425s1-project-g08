package com.example.questionbank.service;

import com.example.questionbank.commons.QuestionWithTitleNotFoundException;
import com.example.questionbank.model.Question;
import com.example.questionbank.repository.QuestionRepository;
import com.example.questionbank.commons.QuestionNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementation of the {@link QuestionServiceInterface} interface.
 * <p>
 * This class contains the business logic for managing {@link Question}
 * entities and interacts with the {@link QuestionRepository}.
 * </p>
 */
@Service
public class QuestionService implements QuestionServiceInterface {

    /**
     * Repository to retrieve data from.
     */
    private final QuestionRepository repository;

    /**
     * Constructs a {@link QuestionService} with the specified repository.
     *
     * @param questionRepository the repository to interact with
     */
    public QuestionService(final QuestionRepository questionRepository) {
        this.repository = questionRepository;
    }

    /**
     * Retrieves all questions from the repository.
     *
     * @return a list of all {@link Question} entities
     */
    @Override
    public List<Question> getAllQuestions() {
        return repository.findAll();
    }

    /**
     * Retrieves a question by its ID.
     *
     * @param id the ID of the question
     * @return the {@link Question} with the specified ID
     * @throws QuestionNotFoundException if the question is not found
     */
    @Override
    public Question getQuestionById(final String id) {
        return repository.findById(id)
                .orElseThrow(() -> new QuestionNotFoundException(id));
    }

    /**
     * Retrieves a question by its title.
     *
     * @param title the title of the question
     * @return the {@link Question} with the specified title
     * @throws QuestionNotFoundException if the question is not found
     */
    @Override
    public Question getQuestionByTitle(final String title) {
        return repository.findQuestionByTitle(title)
                .orElseThrow(() ->
                        new QuestionWithTitleNotFoundException(title));
    }

    /**
     * Creates a new question.
     *
     * @param question the question to create
     * @return the created {@link Question}
     */
    @Override
    public Question createQuestion(final Question question) {
        if (!QuestionValidator.isValidQuestion(question)) {
            throw new IllegalArgumentException("Invalid question data");
        }
        return repository.save(question);
    }

    /**
     * Updates an existing question by its ID.
     *
     * @param id the ID of the question to update
     * @param updatedQuestion the new question data
     * @return the updated {@link Question}
     */
    @Override
    public Question updateQuestion(final String id,
                                   final Question updatedQuestion) {
        if (!QuestionValidator.isValidQuestion(updatedQuestion)) {
            throw new IllegalArgumentException("Invalid new question data");
        }

        return repository.findById(id)
                .map(existingQuestion -> {
                    existingQuestion
                            .setTitle(updatedQuestion.getTitle());
                    existingQuestion
                            .setDescription(updatedQuestion.getDescription());
                    existingQuestion
                            .setCategories(updatedQuestion.getCategories());
                    existingQuestion
                            .setComplexity(updatedQuestion.getComplexity());
                    return repository.save(existingQuestion);
                })
                .orElseGet(() -> {
                    updatedQuestion.setId(id);
                    return repository.save(updatedQuestion);
                });
    }

    /**
     * Deletes a question by its ID.
     *
     * @param id the ID of the question to delete
     * @throws QuestionNotFoundException if the question is not found
     */
    @Override
    public void deleteQuestion(final String id) {
        if (!repository.existsById(id)) {
            throw new QuestionNotFoundException(id);
        }
        repository.deleteById(id);
    }
}

