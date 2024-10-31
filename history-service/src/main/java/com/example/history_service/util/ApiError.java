package com.example.history_service.util;

import java.util.Date;
import java.util.Map;

public record ApiError(
        Date timestamp,
        int status,
        String error,
        String message,
        Map<String, String> validationErrors
) {
}
