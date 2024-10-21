package com.example.questionbank.commons;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Global exception handler for {@link QuestionNotFoundException} in
 * the application.
 * <p>
 * This class handles exceptions of type {@link QuestionNotFoundException}
 * thrown by controllers in the application and provides a response with a
 * 404 Not Found status.
 *
 */
@RestControllerAdvice
@SuppressWarnings("FinalParameters")
class QuestionNotFoundAdvice {

    /**
     * Logger instance for logging exceptions and important information.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(
            QuestionNotFoundAdvice.class
    );

    /**
     * Handles {@link QuestionNotFoundException} and returns a 404 Not
     * Found response.
     * <p>
     * This method is triggered when a {@link QuestionNotFoundException}
     * is thrown in the application. It logs the exception message and
     * returns it as the response body.
     *
     * @param ex the {@link QuestionNotFoundException} that was thrown.
     * @return the exception message as the response body.
     */
    @ExceptionHandler(QuestionNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String questionNotFoundHandler(QuestionNotFoundException ex) {
        LOGGER.error("Question not found: {}", ex.getMessage());
        return ex.getMessage();
    }
}
