package com.example.questionbank.commons;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Global exception handler for {@link MissingFieldException} in the
 * application.
 * <p>
 * This class handles exceptions of type {@link MissingFieldException}
 * thrown by controllers in the application and provides a response with a
 * 400 Bad Request status.
 */
@RestControllerAdvice
@SuppressWarnings("FinalParameters")
public class MissingFieldAdvice {

    /**
     * Logger instance for logging exceptions and important information.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(
            MissingFieldAdvice.class
    );

    /**
     * Handles {@link MissingFieldException} and returns a 400 Bad Request
     * response.
     * <p>
     * This method is triggered when a {@link MissingFieldException} is thrown
     * in the application. It logs the exception message and returns it as the
     * response body.
     *
     * @param ex the {@link MissingFieldException} that was thrown.
     * @return the exception message as the response body.
     */
    @ExceptionHandler(MissingFieldException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String missingFieldHandler(MissingFieldException ex) {
        LOGGER.error("Validation failed as field is null or empty: {}",
                ex.getMessage()
        );
        return ex.getMessage();
    }
}
