package com.example.questionbank.controller;

import java.util.List;
import java.util.stream.Collectors;

import com.example.questionbank.model.Category;
import com.example.questionbank.model.QuestionModelAssembler;

import com.example.questionbank.service.QuestionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.questionbank.model.Question;
import com.example.questionbank.model.Complexity;

/**
 * Controller for managing {@link Question} resources.
 * <p>
 * This REST controller provides endpoints for creating, reading,
 * updating, and deleting questions. It uses {@link QuestionService}
 * to interact with the underlying data store and {@link QuestionModelAssembler}
 * to convert {@link Question} entities to HATEOAS-compliant {@link EntityModel}
 * and {@link CollectionModel}.
 *
 */
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://frontend-service:5173"
})
@RestController
@SuppressWarnings({ "FinalParameters", "HiddenField" })
public class QuestionController {

    /**
     * Logger instance for logging important information and events.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(
            QuestionController.class);

    /**
     * Service with business logic bridging repository and controller.
     */
    private QuestionService service;

    /**
     * Assembler for converting {@link Question} entities to
     * HATEOAS-compliant models.
     */
    private QuestionModelAssembler assembler;

    /**
     * Constructs a {@code QuestionController} with the specified
     * service and assembler.
     *
     * @param service   the {@link QuestionService}
     *                  used to access questions
     * @param assembler the {@link QuestionModelAssembler}
     *                  used to convert
     *                  {@link Question} entities
     */
    QuestionController(QuestionService service,
            QuestionModelAssembler assembler) {
        this.service = service;
        this.assembler = assembler;
    }

    /**
     * Retrieves all questions.
     * <p>
     * This endpoint returns a collection of all questions in the repository,
     * each wrapped in an {@link EntityModel}.
     *
     * @return a {@link CollectionModel} containing {@link EntityModel}s of
     *         all questions
     */
    @GetMapping("/questions")
    public CollectionModel<EntityModel<Question>> all() {
        LOGGER.info("Fetching all questions");

        List<EntityModel<Question>> questions = service.getAllQuestions()
                .stream() //
                .map(assembler::toModel) //
                .collect(Collectors.toList());

        return CollectionModel.of(questions, linkTo(
                methodOn(QuestionController.class).all()).withSelfRel());
    }

    /**
     * Retrieves all questions.
     * <p>
     * This endpoint returns a collection of all questions in the
     * repository that have a certain complexity,
     * each wrapped in an {@link EntityModel}.
     *
     * @param complexity is the specific complexity of all questions retrieved
     * @return a {@link CollectionModel} containing {@link EntityModel}s
     *         of all questions with a certain complexity
     */
    @GetMapping("/questions/complexity/all/{complexity}")
    public CollectionModel<EntityModel<Question>> allByComplexity(
            @PathVariable Complexity complexity) {
        LOGGER.info("Fetching all questions with complexity: {}", complexity);

        List<EntityModel<Question>> questions = service
                .getAllQuestionsByComplexity(complexity)
                .stream() //
                .map(assembler::toModel) //
                .collect(Collectors.toList());

        return CollectionModel.of(questions, linkTo(
                methodOn(QuestionController.class)
                        .allByComplexity(complexity)).withSelfRel());
    }

    /**
     * Retrieves all questions.
     * <p>
     * This endpoint returns a collection of all questions in the repository
     * that have a certain category,
     * each wrapped in an {@link EntityModel}.
     *
     * @param category is the specific categories for all questions retrieved
     * @return a {@link CollectionModel} containing {@link EntityModel}s of
     *         all questions with a certain category
     */
    @GetMapping("/questions/category/all/{category}")
    public CollectionModel<EntityModel<Question>> allByCategory(
            @PathVariable Category category) {
        LOGGER.info("Fetching all questions with category: {}", category);

        List<EntityModel<Question>> questions = service
                .getAllQuestionsByCategory(category)
                .stream() //
                .map(assembler::toModel) //
                .collect(Collectors.toList());

        return CollectionModel.of(questions, linkTo(
                methodOn(QuestionController.class).allByCategory(category))
                .withSelfRel());
    }

    /**
     * Retrieves all questions.
     * <p>
     * This endpoint returns a collection of all questions in the repository
     * that have a certain category and complexity,
     * each wrapped in an {@link EntityModel}.
     *
     * @param category   the specific category of the questions retrieved
     * @param complexity the specific complexity of the questions
     *                   retrieved
     * @return a {@link CollectionModel} containing {@link EntityModel}s
     *         of all questions with a certain category and complexity
     */
    @GetMapping("/questions/category-and-complexity/all/{category}/"
            + "{complexity}")
    public CollectionModel<EntityModel<Question>> allByCategoryAndComplexity(
            @PathVariable Category category,
            @PathVariable Complexity complexity) {
        LOGGER.info(
                "Fetching all questions with category: {} and complexity: {}",
                category, complexity);

        List<EntityModel<Question>> questions = service
                .getAllQuestionsByCategoryAndComplexity(category, complexity)
                .stream() //
                .map(assembler::toModel) //
                .collect(Collectors.toList());

        return CollectionModel.of(questions, linkTo(
                methodOn(QuestionController.class).allByCategoryAndComplexity(
                        category, complexity))
                .withSelfRel());
    }

    /**
     * Creates a new question.
     * <p>
     * This endpoint saves a new question to the repository and
     * returns the created question wrapped in an {@link EntityModel}.
     *
     * @param newQuestion the {@link Question} to be created
     * @return a {@link ResponseEntity} containing the created
     *         {@link EntityModel} of the question
     */
    @PostMapping("/questions")
    ResponseEntity<?> newQuestion(@RequestBody Question newQuestion) {
        LOGGER.info("Creating a new question with title: {}",
                newQuestion.getTitle());

        EntityModel<Question> entityModel = assembler.toModel(
                service.createQuestion(newQuestion));

        return ResponseEntity
                .created(entityModel.getRequiredLink(
                        IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    /**
     * Retrieves a specific question by its ID.
     * <p>
     * This endpoint returns the question with the specified ID wrapped
     * in an {@link EntityModel}.
     *
     * @param id the ID of the question to be retrieved
     * @return an {@link EntityModel} containing the requested question
     */
    @GetMapping("/questions/{id}")
    public EntityModel<Question> one(@PathVariable String id) {
        LOGGER.info("Fetching question with ID: {}", id);

        Question question = service.getQuestionById(id);

        return assembler.toModel(question);
    }

    /**
     * Retrieves a specific question by its title.
     * <p>
     * This endpoint returns the question with the specified title wrapped
     * in an {@link EntityModel}.
     *
     * @param title the title of the question to be retrieved
     * @return an {@link EntityModel} containing the requested question
     */
    @GetMapping("/questions/title/{title}")
    public EntityModel<Question> oneByTitle(@PathVariable String title) {
        LOGGER.info("Fetching question with title: {}", title);

        Question question = service.getQuestionByTitle(title);

        return assembler.toModel(question);
    }

    /**
     * Retrieves one question.
     * <p>
     * This endpoint returns one of a collection of all questions
     * in the repository
     * that have a certain category and complexity,
     * each wrapped in an {@link EntityModel}.
     *
     * @param category   the specific category of the question retrieved
     * @param complexity the specific complexity of the question
     *                   retrieved
     * @return a {@link CollectionModel} containing {@link EntityModel}s
     *         one of the questions with a certain category and complexity
     */
    @GetMapping("/questions/category-and-complexity/random/{category}"
            + "/{complexity}")
    public EntityModel<Question> randomByCategoryAndComplexity(
            @PathVariable Category category,
            @PathVariable Complexity complexity) {
        LOGGER.info(
                "Fetching a random question with category: "
                        + "{} and complexity: {}",
                category, complexity);

        Question question = service.getRandomQuestionByCategoryAndComplexity(
                category, complexity);

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
     *                    question
     * @param id          the ID of the question to be replaced
     * @return a {@link ResponseEntity} containing the updated
     *         {@link EntityModel} of the question
     */
    @PutMapping("/questions/{id}")
    ResponseEntity<?> replaceQuestion(@RequestBody Question newQuestion,
            @PathVariable String id) {
        LOGGER.info("Replacing question with ID: {}", id);

        EntityModel<Question> entityModel = assembler.toModel(
                service.updateQuestion(id, newQuestion));

        return ResponseEntity
                .created(entityModel.getRequiredLink(
                        IanaLinkRelations.SELF).toUri())
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
    ResponseEntity<?> deleteQuestion(@PathVariable String id) {
        LOGGER.info("Deleting question with ID: {}", id);

        service.deleteQuestion(id);

        return ResponseEntity.ok().build();
    }
}
