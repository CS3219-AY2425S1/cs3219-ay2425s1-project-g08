package com.example.questionbank.model;

import com.example.questionbank.controller.CategoryController;
import com.example.questionbank.dto.CategoryDto;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
@SuppressWarnings({"FinalParameters", "DesignForExtension"})
public class CategoryModelAssembler implements
        RepresentationModelAssembler<CategoryDto, EntityModel<CategoryDto>> {
    @Override
    public EntityModel<CategoryDto> toModel(CategoryDto categoryDto) {
        return EntityModel.of(categoryDto,
                linkTo(methodOn(CategoryController.class)
                        .getCategoriesWithQuestions())
                        .withRel("categoriesWithQuestions"),
                linkTo(methodOn(CategoryController.class)
                        .getAllCategories())
                        .withSelfRel());
    }
}
