package com.example.discount.common;

import java.time.LocalDateTime;

public class ApiErrorResponse {

    private final LocalDateTime timestamp;
    private final int status;
    private final String message;

    public ApiErrorResponse(int status, String message) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
