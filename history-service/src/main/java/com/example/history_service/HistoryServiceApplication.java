package com.example.history_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 * The main entry point for the history service Spring Boot application.
 */
@SpringBootApplication
@EnableMongoRepositories
public class HistoryServiceApplication {

	/**
	 * The main method that is the entry point to the
	 * Spring Boot application.
	 *
	 * @param args command-line arguments passed to the application.
	 */
	public static void main(final String... args) {
		SpringApplication.run(HistoryServiceApplication.class, args);
	}

}
