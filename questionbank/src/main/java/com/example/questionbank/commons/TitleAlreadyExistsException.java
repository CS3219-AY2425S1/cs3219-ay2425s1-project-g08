package com.example.questionbank.commons;

/**
 * Exception thrown when a question with a specific title already exists.
 * <p>
 * This exception is used to signal that a requested question with same title
 * already is in the repository. It extends {@link RuntimeException} and
 * provides a specific message including the title of the overlapping question.
 *
 */
@SuppressWarnings("FinalParameters")
public class TitleAlreadyExistsException extends RuntimeException {

    /**
     * Constructs a new {@link TitleAlreadyExistsException} with a detail
     * message including the specified title.
     *
     * The message is constructed as "Question with " followed
     * by the given title, " title already exists."
     *
     * @param title the title of the question that already exists.
     */
    public TitleAlreadyExistsException(String title) {
        super("Question with the title " + title + " already exists.");
    }
}
