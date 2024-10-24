package com.example.questionbank.dto;

import lombok.Getter;
import lombok.AllArgsConstructor;

/**
 * Data Transfer Object for Category.
 * <p>
 * This class represents a category with its name and display name.
 * It is used to transfer category data between layers of the application.
 * </p>
 */
@Getter // Lombok will generate the getters for both fields
@AllArgsConstructor // Lombok will generate a constructor with all fields
public class CategoryDto {

    /** The name of the category (enum name). */
    private String name;

    /** The display name of the category (user-friendly name). */
    private String displayName;
}
