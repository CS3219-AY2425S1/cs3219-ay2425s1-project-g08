package com.example.questionbank.commons;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Global exception handler for {@link ComplexityNotMatchException}.
 * <p>
 * This class handles exceptions of type {@link ComplexityNotMatchException}
 * thrown by controllers and provides a response with a 400 Bad Request status.
 *
 */
@RestControllerAdvice
@SuppressWarnings("FinalParameters")
public class ComplexityNotMatchAdvice {

    /**
     * Logger instance for logging exceptions and important information.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(
            ComplexityNotMatchAdvice.class
    );

    /**
     * Handles {@link ComplexityNotMatchException} and returns a 400 Bad Request
     * response.
     * <p>
     * This method is triggered when a {@link ComplexityNotMatchException}
     * is thrown in the application. It logs the exception message and
     * returns it as the response body.
     *
     * @param ex the {@link ComplexityNotMatchException} that was thrown.
     * @return the exception message as the response body.
     */
    @ExceptionHandler(ComplexityNotMatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String complexityNotMatchHandler(ComplexityNotMatchException ex) {
        LOGGER.error("Invalid complexity: {}", ex.getMessage());
        return ex.getMessage();
    }
}
