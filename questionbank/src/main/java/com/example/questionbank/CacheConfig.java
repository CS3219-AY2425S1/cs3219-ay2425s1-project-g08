package com.example.questionbank;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;

import java.time.Duration;

/**
 * Configuration class for setting up Redis-based caching.
 * <p>This class enables caching and configures a Redis-backed with a default
 * cache TTL
 * of 60 seconds and disables caching of null values.</p>
 */
@Configuration
@EnableCaching
public class CacheConfig {

    /**
     * Configures and returns a {@link CacheManager} bean using Redis.
     * <p>The cache manager is configured to have a default cache TTL of 60
     * seconds and to disable caching
     * for null values.</p>
     *
     * @param redisConnectionFactory The Redis connection factory used to create
     * the cache manager.
     * @return A {@link CacheManager} instance configured with Redis cache
     * settings.
     */
    @Bean
    public CacheManager cacheManager(RedisConnectionFactory
                                                 redisConnectionFactory) {
        RedisCacheConfiguration cacheConfig = RedisCacheConfiguration
                .defaultCacheConfig()
                .entryTtl(Duration.ofSeconds(60))
                .disableCachingNullValues();

        return RedisCacheManager.builder(redisConnectionFactory)
                .cacheDefaults(cacheConfig)
                .build();
    }
}
