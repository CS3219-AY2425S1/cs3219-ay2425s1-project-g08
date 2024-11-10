package com.example.questionbank.commons.cache;

import com.example.questionbank.model.Question;
import lombok.NoArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Component;

/**
 * The CacheEvictor class is responsible for evicting outdated cache.
 * It uses Spring's cche abstraction to stay in sync and employs lazy caching
 */
@Component
@NoArgsConstructor
public class CacheEvictor {
    /**
     * Evicts cache entries for a Question object.
     * This is called whenever a question object is changed in the database
     *
     * @param question
     */
    @Caching(
            evict = {
                    @CacheEvict(value = "allQuestionCache", allEntries = true),
                    @CacheEvict(value = "questionByIdCache",
                            key = "#question.id"),
                    @CacheEvict(value = "questionsByCategoryCache",
                            key = "#question.categories"),
                    @CacheEvict(value = "questionsByComplexityCache",
                            key = "#question.complexity"),
                    @CacheEvict(value = "questionsByCategoryAndComplexityCache",
                            key = "#question.categories + '_' +"
                                    + " #question.complexity")
            }
    )
    public void evictQuestionCache(Question question) {
        System.out.println("Evicting question cache");
        System.out.println(question.toString());
    }
}
