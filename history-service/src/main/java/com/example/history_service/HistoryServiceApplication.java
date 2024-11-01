package com.example.history_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 * The main entry point for the History service Spring Boot application.
 * <p>
 * This class contains the main method that launches the Spring Boot
 * application. The {@link SpringBootApplication} annotation is used
 * to mark this class as a Spring Boot application and to enable
 * autoconfiguration, component scanning, and configuration properties.
 *
 */
@SpringBootApplication
@EnableMongoRepositories
public class HistoryServiceApplication {

    /**
     * The main method that serves as the entry point to the
     * Spring Boot application.
     *
     * @param args command-line arguments passed to the application.
     */
    public static void main(final String... args) {
        SpringApplication.run(HistoryServiceApplication.class, args);
    }

}