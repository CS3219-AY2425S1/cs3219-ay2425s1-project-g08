package com.example.history_service.attempt;

import java.util.Date;

public record AttemptDTO(String id, Date attemptDate, String content, String userId) {
}
