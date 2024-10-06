package com.example.questionbank.service;

import com.example.questionbank.commons.ComplexityNotMatchException;
import com.example.questionbank.commons.MissingFieldException;
import com.example.questionbank.model.Complexity;
import com.example.questionbank.model.Question;

/**
 * Utility class for validating {@link Question} entities.
 * <p>
 * This class provides methods for validating the properties
 * of questions, such as title, description, categories, and complexity.
 *
 */
@SuppressWarnings({"HideUtilityClassConstructor", "FinalParameters"})
public class QuestionValidator {

    /**
     * Validates a {@link Question} entity.
     * <p>
     * This method checks whether the {@code title}, {@code description},
     * {@code categories}, and {@code complexity} of the provided
     * {@link Question} are non-null and non-empty, and ensures that
     * the complexity is a valid {@link Complexity} enum value.
     * <p>
     * If any validation fails, an {@link IllegalArgumentException} is thrown.
     *
     * @param question the {@link Question} entity to be validated.
     * @throws IllegalArgumentException if the {@link Question} is invalid.
     * @return true if no exception thrown in invalid cases
     */
    public static boolean isValidQuestion(Question question) {
        if (question.getTitle() == null
                || question.getTitle().isEmpty()) {
            throw new MissingFieldException("title");
        }
        if (question.getDescription() == null
                || question.getDescription().isEmpty()) {
            throw new MissingFieldException("description");
        }
        if (question.getCategories() == null
                || question.getCategories().isEmpty()) {
            throw new MissingFieldException("categories");
        }
        if (question.getComplexity() == null) {
            throw new MissingFieldException("complexity");
        }

        // Validate that the complexity is a valid enum value
        boolean isValidComplexity = false;
        for (Complexity complexity : Complexity.values()) {
            if (complexity == question.getComplexity()) {
                isValidComplexity = true;
                break;
            }
        }
        if (!isValidComplexity) {
            throw new ComplexityNotMatchException(question
                    .getComplexity().name()
            );
        }

        return true;
    }
}
