package com.example.history_service.attempt.models;

import java.util.Date;
import java.util.List;

public record AttemptForm(
        Date attempt_date,
        String content,
        String userId,
        String title,
        List<String> categories,
        String complexity
) {

}
