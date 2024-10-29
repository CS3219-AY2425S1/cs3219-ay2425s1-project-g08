package com.example.questionbank.commons;

/**
 * Exception thrown when a question with a specific category and
 * complexity is not found.
 * <p>
 * This exception is used to signal that a requested question could not
 * be found in the repository. It extends {@link RuntimeException} and
 * provides a specific message including the category and complexity of
 * the missing question.
 *
 */
@SuppressWarnings("FinalParameters")
public class RandomQuestionNotFoundException extends RuntimeException {

    /**
     * Constructs a new {@link RandomQuestionNotFoundException} with a detail
     * message including the specified category and complexity.
     *
     * The message is constructed as "Could not find question " followed
     * by the given category and complexity.
     *
     * @param category the category of the question that could not be found.
     * @param complexity the complexity of the question that could not be found.
     */
    public RandomQuestionNotFoundException(String category, String complexity) {
        super("Could not find question with category: " + category
                + " and complexity: " + complexity);
    }
}
