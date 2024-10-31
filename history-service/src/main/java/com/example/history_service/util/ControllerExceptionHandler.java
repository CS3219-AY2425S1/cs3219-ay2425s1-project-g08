package com.example.history_service.util;

import com.example.history_service.attempt.exceptions.AttemptNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Global exception handler for REST controllers in this application.
 * This class handles the exceptions thrown in the application.
 */
@ControllerAdvice(annotations = RestController.class)
public class ControllerExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public final ResponseEntity<ApiError> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        List<String> messages = new ArrayList<>();


        Map<String, String> validationErrors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            messages.add(error.getDefaultMessage());
        });
        HttpStatus status = HttpStatus.BAD_REQUEST;
        ApiError apiError = new ApiError(
                new Date(),
                status.value(),
                "Validation Error",
                messages
        );
        return new ResponseEntity<>(apiError, status);
    }

    @ExceptionHandler(AttemptNotFoundException.class)
    public final ResponseEntity<ApiError> handleAttemptNotFoundException(AttemptNotFoundException ex) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        List<String> messages = new ArrayList<>();
        messages.add(ex.getMessage());
        ApiError apiError = new ApiError(
                new Date(),
                status.value(),
                "Attempt not found",
                messages
            );
        return new ResponseEntity<>(apiError, status);
    }
}
