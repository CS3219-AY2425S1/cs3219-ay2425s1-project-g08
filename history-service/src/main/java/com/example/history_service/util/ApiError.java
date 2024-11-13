package com.example.history_service.util;

import java.util.Date;
import java.util.List;

public record ApiError(
        Date timestamp,
        int status,
        String error,
        List<String> messages
) {
}
