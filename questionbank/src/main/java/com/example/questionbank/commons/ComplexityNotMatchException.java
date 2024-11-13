package com.example.questionbank.commons;

/**
 * Exception thrown when the complexity of a question does not match the
 * allowed values.
 * <p>
 * This exception is used to signal that the provided complexity is invalid.
 * It extends {@link RuntimeException} and provides a specific message.
 *
 */
@SuppressWarnings("FinalParameters")
public class ComplexityNotMatchException extends RuntimeException {

    /**
     * Constructs a new {@link ComplexityNotMatchException} with a detail
     * message specifying the invalid complexity value.
     *
     * @param complexity the invalid complexity value.
     */
    public ComplexityNotMatchException(String complexity) {
        super("Invalid complexity: " + complexity
                + ". Allowed values are EASY, MEDIUM, HARD.");
    }
}
