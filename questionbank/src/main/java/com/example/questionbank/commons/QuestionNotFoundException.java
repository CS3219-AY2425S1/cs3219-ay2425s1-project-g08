package com.example.questionbank.commons;

/**
 * Exception thrown when a question with a specific ID is not found.
 * <p>
 * This exception is used to signal that a requested question could not
 * be found in the repository. It extends {@link RuntimeException} and
 * provides a specific message including the ID of the missing question.
 *
 */
@SuppressWarnings("FinalParameters")
public class QuestionNotFoundException extends RuntimeException {

    /**
     * Constructs a new {@link QuestionNotFoundException} with a detail
     * message including the specified ID.
     *
     * The message is constructed as "Could not find question " followed
     * by the given ID.
     *
     * @param id the ID of the question that could not be found.
     */
    public QuestionNotFoundException(String id) {
        super("Could not find question " + id);
    }
}
