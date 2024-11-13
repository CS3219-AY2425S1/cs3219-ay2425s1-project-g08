package com.example.questionbank.commons;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Global exception handler for {@link TitleAlreadyExistsException} in
 * the application.
 * <p>
 * This class handles exceptions of type {@link TitleAlreadyExistsException}
 * thrown by controllers in the application and provides a response with a
 * 409 Conflict status.
 *
 */
@RestControllerAdvice
@SuppressWarnings("FinalParameters")
class TitleAlreadyExistsAdvice {

    /**
     * Logger instance for logging exceptions and important information.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(
            TitleAlreadyExistsAdvice.class
    );

    /**
     * Handles {@link TitleAlreadyExistsException} and returns a 409 Conflict
     * response.
     * <p>
     * This method is triggered when a {@link TitleAlreadyExistsException}
     * is thrown in the application. It logs the exception message and
     * returns it as the response body.
     *
     * @param ex the {@link TitleAlreadyExistsException} that was thrown.
     * @return the exception message as the response body.
     */
    @ExceptionHandler(TitleAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String titleAlreadyExistsHandler(TitleAlreadyExistsException ex) {
        LOGGER.error("Title already exists: {}", ex.getMessage());
        return ex.getMessage();
    }
}
