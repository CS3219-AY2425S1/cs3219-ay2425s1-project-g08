package com.example.questionbank.commons;

/**
 * Exception thrown when a question with a specific title is not found.
 * <p>
 * This exception is used to signal that a requested question could not
 * be found in the repository. It extends {@link RuntimeException} and
 * provides a specific message including the title of the missing question.
 *
 */
@SuppressWarnings("FinalParameters")
public class QuestionWithTitleNotFoundException extends RuntimeException {

    /**
     * Constructs a new {@link QuestionWithTitleNotFoundException} with a detail
     * message including the specified title.
     *
     * The message is constructed as "Could not find question with title "
     * followed by the given title.
     *
     * @param title the title of the question that could not be found.
     */
    public QuestionWithTitleNotFoundException(String title) {
        super("Could not find question with title " + title);
    }
}
