package com.example.questionbank;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

/**
 * Configuration class for setting up Redis connection and RedisTemplate in the
 * Spring application.
 */
@Configuration
public class RedisConfig {
    /**
     * Creates a bean using Lettuce as the connection provider.
     * This bean establishes a connection to the Redis server
     *
     * @return instance configured for Lettuce
     */
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        final String hostname = "redis";
        final int port = 6379;
        return new LettuceConnectionFactory(hostname, port);
    }

    /**
     * Creates a bean for interacting with Redis.
     * <p>This template is configured with the provided
     * {@link RedisConnectionFactory} to manage Redis
     * operations for Redis keys of type {@code String} and values of type
     * {@code Object}.</p>
     *
     * @param redisConnectionFactory The connection factory used to create Redis
     * connections.
     * @return A {@link RedisTemplate} instance for performing Redis operations.
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate(
            RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
        return template;
    }
}
