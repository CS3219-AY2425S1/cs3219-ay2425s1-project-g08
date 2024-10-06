package com.example.questionbank.commons;

/**
 * Exception thrown when a new question is missing a field
 * <p>
 * This exception is used to signal that the inputted question has a null or
 * empty field and is not valid. It extends {@link RuntimeException} and
 * provides a specific message.
 *
 */
@SuppressWarnings("FinalParameters")
public class MissingFieldException extends RuntimeException {

    /**
     * Constructs a new {@link MissingFieldException} with a detail
     * message depending on which field is missing.
     *
     * @param field the field of the question that is missing.
     */
    public MissingFieldException(String field) {
        super("The field '" + field + "' is missing or empty in the question.");
    }
}
