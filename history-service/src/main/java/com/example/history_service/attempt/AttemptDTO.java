package com.example.history_service.attempt;

import java.util.Date;
import java.util.List;

public record AttemptDTO(String id, Date attemptDate, String content, String userId, String title, List<String> categories,
                         String complexity) {
}
