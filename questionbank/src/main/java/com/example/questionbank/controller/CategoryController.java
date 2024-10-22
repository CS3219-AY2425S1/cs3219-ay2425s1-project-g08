package com.example.questionbank.controller;

import com.example.questionbank.model.Question;
import com.example.questionbank.model.QuestionModelAssembler;
import com.example.questionbank.service.QuestionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.example.questionbank.model.Category;
import com.example.questionbank.dto.CategoryDto;

@RestController
public class CategoryController {

    /**
     * Logger instance for logging important information and events.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(
            CategoryController.class
    );

    /**
     * Service with business logic bridging repository and controller.
     */
    private QuestionService service;

    /**
     * Constructs a {@code CategoryController} with the specified
     * service.
     *
     * @param service the {@link QuestionService}
     *                           used to access questions
     * {@link Question} entities
     */
    public CategoryController(QuestionService service) {
        this.service = service;
    }

    /**
     * Retrieves all categories.
     * <p>
     * This endpoint returns a collection of all available categories in
     * the application.
     *
     * @return a list of all categories
     */
    @GetMapping("/categories")
    public List<CategoryDto> getAllCategories() {
        LOGGER.info("Fetching all categories");

        // Map enum values to DTOs
        return Arrays.stream(Category.values())
                .map(category -> new CategoryDto(category.name(), category.getDisplayName()))
                .collect(Collectors.toList());
    }

    /**
     * Retrieves all unique categories that have questions in the database.
     *
     * @return a set of unique categories
     */
    @GetMapping("/categories/with-questions")
    public List<CategoryDto> getCategoriesWithQuestions() {
        LOGGER.info("Fetching all categories with existing questions");

        // Fetch unique categories from the service
        Set<Category> uniqueCategories = service.getUniqueCategoriesWithQuestions();

        // Map unique categories to DTOs
        return uniqueCategories.stream()
                .map(category -> new CategoryDto(category.name(), category.getDisplayName()))
                .collect(Collectors.toList());
    }
}
