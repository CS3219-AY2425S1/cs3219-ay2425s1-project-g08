package com.example.questionbank.controller;

import java.util.List;
import java.util.stream.Collectors;

import com.example.questionbank.repository.QuestionRepository;
import com.example.questionbank.model.QuestionModelAssembler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.questionbank.model.Question;
import com.example.questionbank.commons.QuestionNotFoundException;

/**
 * Controller for managing {@link Question} resources.
 * <p>
 * This REST controller provides endpoints for creating, reading,
 * updating, and deleting questions. It uses {@link QuestionRepository}
 * to interact with the underlying data store and {@link QuestionModelAssembler}
 * to convert {@link Question} entities to HATEOAS-compliant {@link EntityModel}
 * and {@link CollectionModel}.
 *
 */
@RestController
public class QuestionController {

    /**
     * Logger instance for logging important information and events.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(
            QuestionController.class
    );

    /**
     * Repository for retrieving question data.
     */
    private final QuestionRepository repository;

    /**
     * Assembler for converting {@link Question} entities to
     * HATEOAS-compliant models.
     */
    private final QuestionModelAssembler assembler;

    /**
     * Constructs a {@code QuestionController} with the specified
     * repository and assembler.
     *
     * @param questionRepository the {@link QuestionRepository}
     *                           used to access questions
     * @param questionAssembler  the {@link QuestionModelAssembler}
     *                           used to convert
     * {@link Question} entities
     */
    QuestionController(final QuestionRepository questionRepository,
                       final QuestionModelAssembler questionAssembler) {
        this.repository = questionRepository;
        this.assembler = questionAssembler;
    }


    /**
     * Retrieves all questions.
     * <p>
     * This endpoint returns a collection of all questions in the repository,
     * each wrapped in an {@link EntityModel}.
     *
     * @return a {@link CollectionModel} containing {@link EntityModel}s of
     * all questions
     */
    @GetMapping("/questions")
    public CollectionModel<EntityModel<Question>> all() {
        LOGGER.info("Fetching all questions");

        List<EntityModel<Question>> questions = repository.findAll()
                .stream() //
                .map(assembler::toModel) //
                .collect(Collectors.toList());

        return CollectionModel.of(questions, linkTo(
                methodOn(QuestionController.class).all()
        ).withSelfRel());
    }


    /**
     * Creates a new question.
     * <p>
     * This endpoint saves a new question to the repository and
     * returns the created question wrapped in an {@link EntityModel}.
     *
     * @param newQuestion the {@link Question} to be created
     * @return a {@link ResponseEntity} containing the created
     * {@link EntityModel} of the question
     */
    @PostMapping("/questions")
    ResponseEntity<?> newQuestion(@RequestBody final Question newQuestion) {
        LOGGER.info("Creating a new question with title: {}",
                newQuestion.getTitle()
        );

        EntityModel<Question> entityModel = assembler.toModel(
                repository.save(newQuestion)
        );

        return ResponseEntity
                .created(entityModel.getRequiredLink(
                        IanaLinkRelations.SELF).toUri()
                )
                .body(entityModel);
    }

    /**
     * Retrieves a specific question by its ID.
     * <p>
     * This endpoint returns the question with the specified ID wrapped
     * in an {@link EntityModel}. If the question is not found,
     * a {@link QuestionNotFoundException} is thrown.
     *
     * @param id the ID of the question to be retrieved
     * @return an {@link EntityModel} containing the requested question
     */
    @GetMapping("/questions/{id}")
    public EntityModel<Question> one(@PathVariable final String id) {
        LOGGER.info("Fetching question with ID: {}", id);

        Question question = repository.findById(id) //
                .orElseThrow(() -> {
                    LOGGER.error("Question with ID {} not found", id);
                    return new QuestionNotFoundException(id);
                });

        return assembler.toModel(question);
    }

    /**
     * Replaces an existing question with a new question.
     * <p>
     * This endpoint updates the question with the specified ID using
     * the provided {@link Question} data. If the question does not exist,
     * the new question is created.
     *
     * @param newQuestion the {@link Question} data to replace the existing
     *        question
     * @param id the ID of the question to be replaced
     * @return a {@link ResponseEntity} containing the updated
     * {@link EntityModel} of the question
     */
    @PutMapping("/questions/{id}")
    ResponseEntity<?> replaceQuestion(@RequestBody final Question newQuestion,
                                      @PathVariable final String id) {
        LOGGER.info("Replacing question with ID: {}", id);

        Question updatedQuestion = repository.findById(id) //
                .map(question -> {
                    question.setTitle(newQuestion.getTitle());
                    question.setDescription(newQuestion.getDescription());
                    question.setCategories(newQuestion.getCategories());
                    question.setComplexity(newQuestion.getComplexity());
                    return repository.save(question);
                }) //
                .orElseGet(() -> {
                    return repository.save(newQuestion);
                });

        EntityModel<Question> entityModel = assembler.toModel(
                updatedQuestion
        );

        return ResponseEntity
                .created(entityModel.getRequiredLink(
                        IanaLinkRelations.SELF).toUri()
                )
                .body(entityModel);
    }

    /**
     * Deletes a specific question by its ID.
     * <p>
     * This endpoint removes the question with the specified ID from
     * the repository.
     *
     * @param id the ID of the question to be deleted
     * @return a {@link ResponseEntity} with no content
     */
    @DeleteMapping("/questions/{id}")
    ResponseEntity<?> deleteQuestion(@PathVariable final String id) {
        LOGGER.info("Deleting question with ID: {}", id);

        repository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
