package com.example.history_service.attempt;

import com.example.history_service.attempt.models.AttemptDTO;

import java.util.List;

/**
 * Interface for the Attempt Service, providing methods for managing user attempts.
 */
public interface IAttemptService {

    /**
     * Retrieves an Attempt by its unique id.
     *
     * @param id the unique identifier of the attempt to retrieve.
     * @return an AttemptDTO containing the details of the specified attempt.
     */
    AttemptDTO getAttemptById(String id);

    /**
     * Retrieves a list of attempts for a specific user.
     *
     * @param userId the unique identifier of the user whose attempts are being retrieved.
     * @return a list of AttepmtDTO objects for the specified user.
     */
    List<AttemptDTO> getAttemptsByUserId(String userId);

    /**
     * Creates a new attempt with the specified details.
     *
     * @param dto an AttemptDTO containing the information of the attempt to create.
     * @return the created AttemptDTO with a unique identifier.
     */
    AttemptDTO createAttempt(AttemptDTO dto);
}
