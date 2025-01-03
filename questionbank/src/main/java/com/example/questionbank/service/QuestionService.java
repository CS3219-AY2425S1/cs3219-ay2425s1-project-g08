package com.example.questionbank.service;

import com.example.questionbank.commons.QuestionWithTitleNotFoundException;
import com.example.questionbank.commons.RandomQuestionNotFoundException;
import com.example.questionbank.commons.TitleAlreadyExistsException;
import com.example.questionbank.commons.cache.CacheEvictor;
import com.example.questionbank.model.Category;
import com.example.questionbank.model.Question;
import com.example.questionbank.model.Complexity;
import com.example.questionbank.repository.QuestionRepository;
import com.example.questionbank.commons.QuestionNotFoundException;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Implementation of the {@link QuestionServiceInterface} interface.
 * <p>
 * This class contains the business logic for managing {@link Question}
 * entities and interacts with the {@link QuestionRepository}.
 * </p>
 */
@Service
@SuppressWarnings("FinalParameters")
public class QuestionService implements QuestionServiceInterface {

    /**
     * Repository to retrieve data from.
     */
    private QuestionRepository repository;
    /**
     * Cache evictor to evict stale cache.
     */
    private CacheEvictor cacheEvictor;

    /**
     * Constructs a {@link QuestionService} with the specified repository.
     *
     * @param questionRepository the repository to interact with
     * @param cacheEvictor the evictor used to evict stale cache
     */
    public QuestionService(QuestionRepository questionRepository,
                           CacheEvictor cacheEvictor) {
        this.repository = questionRepository;
        this.cacheEvictor = cacheEvictor;
    }

    /**
     * Retrieves all questions from the repository.
     *
     * @return a list of all {@link Question} entities
     */
    @Override
    @Cacheable(value = "allQuestionCache")
    public List<Question> getAllQuestions() {
        return repository.findAll();
    }

    /**
     * Retrieves all questions from the repository with a given complexity.
     *
     * @return a list of all {@link Question} entities with a given complexity
     */
    @Override
    @Cacheable(value = "questionsByComplexityCache", key = "#complexity")
    public List<Question> getAllQuestionsByComplexity(Complexity complexity) {
        return repository.findQuestionsByComplexity(complexity);
    }

    /**
     * Retrieves all questions from the repository with a given category.
     *
     * @return a list of all {@link Question} entities with a given category
     */
    @Override
    @Cacheable(value = "questionsByCategoryCache", key = "#category.name()")
    public List<Question> getAllQuestionsByCategory(Category category) {
        return repository.findQuestionsByCategoriesIsContaining(category);
    }

    /**
     * Retrieves all questions from the repository with a given category
     * and complexity.
     *
     * @return a list of all {@link Question} entities with a given category
     * and complexity.
     */
    @Override
    @Cacheable(value = "questionsByCategoryAndComplexityCache",
            key = "#category + '_' + #complexity")
    public List<Question> getAllQuestionsByCategoryAndComplexity(
            Category category, Complexity complexity) {
        return repository.findQuestionsByCategoriesIsContainingAndComplexity(
                category, complexity
        );
    }

    /**
     * Retrieves a question by its ID.
     *
     * @param id the ID of the question
     * @return the {@link Question} with the specified ID
     * @throws QuestionNotFoundException if the question is not found
     */
    @Override
    @Cacheable(value = "questionByIdCache", key = "#id")
    public Question getQuestionById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new QuestionNotFoundException(id));
    }

    /**
     * Retrieves a question by its title.
     *
     * @param title the title of the question
     * @return the {@link Question} with the specified title
     * @throws QuestionWithTitleNotFoundException if the question is not found
     */
    @Override
    @Cacheable(value = "questionByTitleCache", key = "#title")
    public Question getQuestionByTitle(String title) {
        return repository.findQuestionByTitle(title)
            .orElseThrow(() ->
                new QuestionWithTitleNotFoundException(title));
    }

    /**
     * Creates a new question.
     *
     * @param question the question to create
     * @return the created {@link Question}
     */
    @Override
    public Question createQuestion(Question question) {
        if (!QuestionValidator.isValidQuestion(question)) {
            throw new IllegalArgumentException("Invalid question data");
        }
        if (repository.findQuestionByTitle(question.getTitle()).isPresent()) {
            throw new TitleAlreadyExistsException(question.getTitle());
        }
        Question savedQuestion = repository.save(question);
        this.cacheEvictor.evictQuestionCache(question);
        return savedQuestion;
    }

    /**
     * Updates an existing question by its ID.
     *
     * @param id              the ID of the question to update
     * @param updatedQuestion the new question data
     * @return the updated {@link Question}
     */
    @Override
    @CacheEvict(value = "allQuestionCache", allEntries = true)
    public Question updateQuestion(String id,
            Question updatedQuestion) {
        System.out.println(updatedQuestion.toString());
        if (!QuestionValidator.isValidQuestion(updatedQuestion)) {
            throw new IllegalArgumentException("Invalid new question data");
        }

        Question oldQuestion = repository
            .findById(id)
            .orElseThrow(() -> new QuestionNotFoundException(id));

        if (!oldQuestion.getTitle().equals(updatedQuestion.getTitle())
            && repository.findQuestionByTitle(updatedQuestion.getTitle())
                .isPresent()) {
            throw new TitleAlreadyExistsException(updatedQuestion.getTitle());
        }
        this.cacheEvictor.evictQuestionCache(oldQuestion);
        return repository.findById(id)
                .map(existingQuestion -> {
                    existingQuestion
                            .setTitle(updatedQuestion.getTitle());
                    existingQuestion
                            .setDescription(updatedQuestion.getDescription());
                    existingQuestion
                            .setCategories(updatedQuestion.getCategories());
                    existingQuestion
                            .setComplexity(updatedQuestion.getComplexity());
                    return repository.save(existingQuestion);
                })
                .orElseGet(() -> {
                    updatedQuestion.setId(id);
                    return repository.save(updatedQuestion);
                });
    }

    /**
     * Deletes a question by its ID.
     *
     * @param id the ID of the question to delete
     * @throws QuestionNotFoundException if the question is not found
     */
    @Override
    public void deleteQuestion(String id) {
        Question question = repository.findById(id) // Used for cache eviction
                .orElseThrow(() -> new QuestionNotFoundException(id));
        this.cacheEvictor.evictQuestionCache(question);
        repository.deleteById(id);
    }

    /**
     * Retrieves all unique categories for which there are questions in the
     * database.
     *
     * @return a set of unique categories
     */
    @Override
    public Set<Category> getUniqueCategoriesWithQuestions() {
        return repository.findAll()
                .stream()
                // Flatten the list of categories
                .flatMap(question -> question.getCategories().stream())
                // Collect the unique categories into a Set
                .collect(Collectors.toSet());
    }

    /**
     * Retrieves one question by its category and complexity.
     *
     * @param category the category of the questions to retrieve
     * @param complexity the complexity level of the questions to retrieve
     * @return a list of all {@link Question} entities with a given category
     * and complexity.
     */
    @Override
    public Question getRandomQuestionByCategoryAndComplexity(Category category,
                                                      Complexity complexity) {
        List<Question> questionList = repository
                .findQuestionsByCategoriesIsContainingAndComplexity(
                category, complexity);
        int randomNum = new Random().nextInt(questionList.size());
        Question randomQuestion = questionList.get(randomNum);
        if (randomQuestion == null) {
            throw new RandomQuestionNotFoundException(category.toString(),
                    complexity.toString());
        }
        return randomQuestion;
    }
}
