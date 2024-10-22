package com.example.questionbank.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.example.questionbank.model.Category;
import com.example.questionbank.dto.CategoryDto;

@RestController
public class CategoryController {

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
        // Map enum values to DTOs
        return Arrays.stream(Category.values())
                .map(category -> new CategoryDto(category.name(), category.getDisplayName()))
                .collect(Collectors.toList());
    }
}
