package com.example.history_service.attempt.models;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Data Transfer Object for the Attempt entity.
 * This object is only used in the Controller and Service layers.
 *
 * @param id          Unique identifier for each attempt.
 * @param attemptDateTime LocalDateTime when the attempt was made.
 * @param content     Content of the attempt.
 * @param userId      ID of the user who made the attempt.
 * @param title       Title of the attempt.
 * @param description Detailed description of the attempt.
 * @param categories  Categories associated with the attempt.
 * @param complexity  Complexity level of the attempt.
 */
public record AttemptDTO(String id, LocalDateTime attemptDateTime, String content,
                         String userId, String title, String description,
                         List<String> categories, String complexity) {
}
