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
 * Attempt represents the document we are storing in the database.
 */
@Document("attempt")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Attempt {
    @Id
    private String id;
    private Date attempt_date;
    private String content;
    private String userId;
    private String title;
    private List<String> categories;
    private String complexity;
}
