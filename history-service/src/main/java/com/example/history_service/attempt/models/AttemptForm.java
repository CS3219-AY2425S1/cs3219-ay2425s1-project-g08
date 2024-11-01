package com.example.history_service.attempt.models;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import java.util.Date;
import java.util.List;

/**
 * AttemptForm serves as a data model for capturing user input to create or update an Attempt.
 * This record enforces validation constraints on the input fields to ensure data integrity and correctness.
 *
 * @param attempt_date Date when the attempt was made. Must be in the past and not null.
 * @param content      Content of the attempt. Must not be empty.
 * @param userId       ID of the user who made the attempt. Must not be empty.
 * @param title        Title of the attempt. Must not be empty.
 * @param description  Detailed description of the attempt. Must not be empty.
 * @param categories   Categories associated with the attempt. Must not be empty.
 * @param complexity   Complexity level of the attempt. Must not be empty.
 */
public record AttemptForm(
        @Past(message="Attempt date provided must be in the past!")
        @NotNull(message = "Attempt date must not be null!")
        Date attempt_date,
        @NotEmpty(message = "Content must not be empty!")
        String content,
        @NotEmpty(message = "User ID must not be empty!")
        String userId,
        @NotEmpty(message = "Title must not be empty!")
        String title,
        @NotEmpty(message = "Description must not be empty!")
        String description,
        @NotEmpty(message = "Categories must not be empty!")
        List<String> categories,
        @NotEmpty(message = "Complexity must not be empty!")
        String complexity
) {

}
