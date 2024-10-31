package com.example.history_service.attempt.models;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import java.util.Date;
import java.util.List;

public record AttemptForm(
        @Past(message="Attempt date provided must be in the past!")
        @NotNull(message="Attempt date must not be null!")
        Date attempt_date,
        @NotEmpty(message="Content must not be empty!")
        String content,
        @NotEmpty(message="User ID must not be empty!")
        String userId,
        @NotEmpty(message="Title must not be empty!")
        String title,
        @NotEmpty(message="Categories must not be empty!")
        List<String> categories,
        @NotEmpty(message="Complexity must not be empty!")
        String complexity
) {

}
