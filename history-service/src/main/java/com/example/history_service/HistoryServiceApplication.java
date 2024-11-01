package com.example.history_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 * Entry point for the History Service application.
 */
@SpringBootApplication
@EnableMongoRepositories
public class HistoryServiceApplication {
	/**
	 * Main method to launch the application.
	 *
	 * @param args CLI arguments
	 */
	public static void main(String[] args) {
		SpringApplication.run(HistoryServiceApplication.class, args);
	}

}
