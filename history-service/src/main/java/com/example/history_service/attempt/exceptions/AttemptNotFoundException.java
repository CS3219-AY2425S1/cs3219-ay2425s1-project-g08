package com.example.history_service.attempt.exceptions;

/**
 * Exception thrown when an Attempt entity is not found in the database.
 */
public class AttemptNotFoundException extends RuntimeException {
    /**
     * Constructs a new AttemptNotFoundException with the specified message.
     *
     * @param message the detail message explaining the cuase of its exception.
     */
    public AttemptNotFoundException(String message) {
        super(message);
    }
}
