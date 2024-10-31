package com.example.history_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class HistoryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(HistoryServiceApplication.class, args);
	}

}
