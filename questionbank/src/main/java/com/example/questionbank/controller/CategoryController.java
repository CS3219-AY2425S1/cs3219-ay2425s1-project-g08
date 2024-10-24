package com.example.questionbank.controller;

import com.example.questionbank.model.CategoryModelAssembler;
import com.example.questionbank.service.QuestionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.example.questionbank.model.Category;
import com.example.questionbank.dto.CategoryDto;

@CrossOrigin(origins = "http://localhost:5173")
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
     * Assembler for converting {@link CategoryDto} to HATEOAS-compliant models.
     */
    private final CategoryModelAssembler assembler;

    /**
     * Constructs a {@code CategoryController} with the specified service and assembler.
     *
     * @param service the {@link QuestionService} used to access questions
     * @param assembler the {@link CategoryModelAssembler} used to convert
     *                  {@link CategoryDto} entities
     */
    public CategoryController(QuestionService service, CategoryModelAssembler assembler) {
        this.service = service;
        this.assembler = assembler;
    }

    /**
     * Retrieves all categories.
     * <p>
     * This endpoint returns a collection of all available categories in
     * the application.
     *
     * @return a {@link CollectionModel} containing {@link EntityModel}s of all categories
     */
    @GetMapping("/categories")
    public CollectionModel<EntityModel<CategoryDto>> getAllCategories() {
        LOGGER.info("Fetching all categories");

        // Map enum values to DTOs
        List<EntityModel<CategoryDto>> categories = Arrays.stream(Category.values())
                .map(category -> assembler.toModel(new CategoryDto(category.name(), category.getDisplayName())))
                .collect(Collectors.toList());

        return CollectionModel.of(categories);
    }

    /**
     * Retrieves all unique categories that have questions in the database.
     *
     * @return a {@link CollectionModel} containing {@link EntityModel}s of unique categories
     */
    @GetMapping("/categories/with-questions")
    public CollectionModel<EntityModel<CategoryDto>> getCategoriesWithQuestions() {
        LOGGER.info("Fetching all categories with existing questions");

        // Fetch unique categories from the service
        Set<Category> uniqueCategories = service.getUniqueCategoriesWithQuestions();

        // Map unique categories to DTOs
        List<EntityModel<CategoryDto>> categories = uniqueCategories.stream()
                .map(category -> assembler.toModel(new CategoryDto(category.name(), category.getDisplayName())))
                .collect(Collectors.toList());

        return CollectionModel.of(categories);
    }

//
//
//    /**
//     * Retrieves all categories.
//     * <p>
//     * This endpoint returns a collection of all available categories in
//     * the application.
//     *
//     * @return a list of all categories
//     */
//    @GetMapping("/categories")
//    public List<CategoryDto> getAllCategories() {
//        LOGGER.info("Fetching all categories");
//
//        // Map enum values to DTOs
//        return Arrays.stream(Category.values())
//                .map(category -> new CategoryDto(category.name(), category.getDisplayName()))
//                .collect(Collectors.toList());
//    }
//
//    /**
//     * Retrieves all unique categories that have questions in the database.
//     *
//     * @return a set of unique categories
//     */
//    @GetMapping("/categories/with-questions")
//    public List<CategoryDto> getCategoriesWithQuestions() {
//        LOGGER.info("Fetching all categories with existing questions");
//
//        // Fetch unique categories from the service
//        Set<Category> uniqueCategories = service.getUniqueCategoriesWithQuestions();
//
//        // Map unique categories to DTOs
//        return uniqueCategories.stream()
//                .map(category -> new CategoryDto(category.name(), category.getDisplayName()))
//                .collect(Collectors.toList());
//    }
}
