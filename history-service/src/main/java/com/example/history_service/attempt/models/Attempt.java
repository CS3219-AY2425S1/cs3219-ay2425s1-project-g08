package com.example.history_service.attempt.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

/**
 * Attempt represents the document stored in mongodb.
 * This model stores the all relevant details about a user's attempt.
 *
 * Question details are also stored in this class to avoid issues when questions
 * are modified or deleted.
 */
@Document("attempt")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Attempt {
    /**
     * Unique identifier for each attempt.
     */
    @Id
    private String id;

    /**
     * Date when the attempt was made.
     */
    private Date attemptDate;

    /**
     * Content of the attempt.
     */
    private String content;

    /**
     * ID of the user who made the attempt.
     */
    private String userId;

    /**
     * Title of the attempt.
     */
    private String title;

    /**
     * Detailed description of the attempt.
     */
    private String description;

    /**
     * Categories associated with the attempt, represented as a list of strings.
     */
    private List<String> categories;

    /**
     * Complexity level of the attempt, represented as a string.
     */
    private String complexity;
}
