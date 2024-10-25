package com.example.questionbank.service;

import com.example.questionbank.commons.ComplexityNotMatchException;
import com.example.questionbank.commons.MissingFieldException;
import com.example.questionbank.model.Complexity;
import com.example.questionbank.model.Question;
import com.example.questionbank.model.Category;

import java.util.List;

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

        // Validate complexity is one of the allowed enum values
        if (!isValidComplexity(question.getComplexity())) {
            throw new ComplexityNotMatchException(question.getComplexity().name());
        }

        // Validate categories are all valid enum values
        validateCategories(question.getCategories());

        return true;
    }

    /**
     * Validates the complexity of a {@link Question}
     * 
     * @param complexity the {@link Complexity} to validate. 
     * @return true if the complexity is valid.
     */
    private static boolean isValidComplexity(Complexity complexity) {
        boolean isValidComplexity = false;
        for (Complexity validComplexity : Complexity.values()) {
            if (validComplexity == complexity) {
                isValidComplexity = true;
                break;
            }
        }
        return isValidComplexity;
    }

    /**
     * Validates that the categories list contains only valid {@link Category} enum values.
     *
     * @param categories the list of categories to validate.
     * @throws IllegalArgumentException if any category is invalid.
     */
    private static void validateCategories(List<Category> categories) {
        for (Category category : categories) {
            if (!isValidCategory(category)) {
                throw new IllegalArgumentException("Invalid category: " + category.name());
            }
        }
    }

    /**
     * Checks if the given category is a valid {@link Category} enum value.
     *
     * @param category the {@link Category} to check.
     * @return true if the category is valid.
     */
    private static boolean isValidCategory(Category category) {
        for (Category validCategory : Category.values()) {
            if (validCategory == category) {
                return true;
            }
        }
        return false;
    }
}