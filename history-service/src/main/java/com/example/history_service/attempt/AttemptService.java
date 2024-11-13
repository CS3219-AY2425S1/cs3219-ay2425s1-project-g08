package com.example.history_service.attempt;

import com.example.history_service.attempt.exceptions.AttemptNotFoundException;
import com.example.history_service.attempt.models.Attempt;
import com.example.history_service.attempt.models.AttemptDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class encapsulating business logic for managing Attempt entities.
 */
@Service
public class AttemptService implements IAttemptService {
    /**
     * Repository interface to interact with the underlying database.
     */
    private AttemptRepository attemptRepository;

    /**
     * Constructs a new AttemptService with the provided AttemptRepository.
     *
     * @param attemptRepository the repository for performing database
     *                          operations on Attempt documents.
     */
    @Autowired
    public AttemptService(AttemptRepository attemptRepository) {
        this.attemptRepository = attemptRepository;
    }

    /**
     * Retrieves an attempt by its unique id.
     *
     * @param id the unique identifier of the attempt.
     * @return the AttemptDTO representing the found attempt.
     * @throws AttemptNotFoundException if no attempt with the given id exists.
     */
    public AttemptDTO getAttemptById(String id) {
        Attempt attempt = this.attemptRepository.findById(id)
                .orElseThrow(() -> new AttemptNotFoundException(
                        "Attempt not found"));
        return new AttemptDTO(attempt.getId(), attempt.getAttemptDateTime(),
                attempt.getContent(), attempt.getUserId(), attempt.getTitle(),
                attempt.getDescription(), attempt.getCategories(),
                attempt.getComplexity());
    }

    /**
     * Retrieves all attempts associated with a specific user.
     *
     * @param userId the unique identifier of the user.
     * @return a list of AttemptDTO representing the attempts associated with
     * the userId.
     */
    public List<AttemptDTO> getAttemptsByUserId(String userId) {
        return this.attemptRepository.findByUserId(userId)
                .stream()
                .map(attempt -> new AttemptDTO(
                        attempt.getId(),
                        attempt.getAttemptDateTime(),
                        attempt.getContent(),
                        attempt.getUserId(),
                        attempt.getTitle(),
                        attempt.getDescription(),
                        attempt.getCategories(),
                        attempt.getComplexity()
                ))
                .sorted(Comparator.comparing(AttemptDTO::attemptDateTime)
                        .reversed())
                .collect(Collectors.toList());
    }

    /**
     * Creates a new attempt based on the provided DTO.
     *
     * @param dto the data transfer object containing attempt details.
     * @return an AttemptDTO representing the newly created attempt.
     */
    public AttemptDTO createAttempt(AttemptDTO dto) {
        Attempt attempt = this.attemptRepository.insert(new Attempt(dto.id(),
                dto.attemptDateTime(), dto.content(), dto.userId(), dto.title(),
                dto.description(), dto.categories(), dto.complexity()));
        return new AttemptDTO(
                attempt.getId(),
                attempt.getAttemptDateTime(),
                attempt.getContent(),
                attempt.getUserId(),
                attempt.getTitle(),
                attempt.getDescription(),
                attempt.getCategories(),
                attempt.getComplexity()
        );
    }
}
