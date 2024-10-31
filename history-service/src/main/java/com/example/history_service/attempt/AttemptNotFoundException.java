package com.example.history_service.attempt;

public class AttemptNotFoundException extends RuntimeException {
    public AttemptNotFoundException(String message) {
        super(message);
    }
}
