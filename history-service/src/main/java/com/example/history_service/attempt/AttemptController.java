package com.example.history_service.attempt;

import com.example.history_service.attempt.models.AttemptDTO;
import com.example.history_service.attempt.models.AttemptForm;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller for handling HTTP requests related to attempts.
 *
 * This class provides endpoints to retrieve and create attempts.
 */
@CrossOrigin(origins = {"*"})
@RestController
public class AttemptController {

    /** The service for handling attempts */
    private final IAttemptService attemptService;

    /**
     * Constructs an AttemptController with the specified IAttemptService.
     *
     * @param attemptService the service for handling attempts
     */
    @Autowired
    public AttemptController(IAttemptService attemptService) {
        this.attemptService = attemptService;
    }

    /**
     * Retrieves an attempt by its ID.
     *
     * @param id the ID of the attempt
     * @return ResponseEntity containing the AttemptDTO and HTTP status
     */
    @GetMapping(value = "/attempt/{id}")
    public ResponseEntity<AttemptDTO> getAttemptById(@PathVariable("id")
                                                     String id) {
        AttemptDTO attempt = this.attemptService.getAttemptById(id);
        return new ResponseEntity<>(attempt, HttpStatus.OK);
    }

    /**
     * Retrieves all attempts for a specific user.
     *
     * @param userId the ID of the user
     * @return ResponseEntity containing a list of AttemptDTOs and HTTP status
     */
    @GetMapping(value = "/{userId}/attempts")
    public ResponseEntity<List<AttemptDTO>> getAttemptsByUserId(
            @PathVariable("userId") String userId) {
        List<AttemptDTO> attempts = this.attemptService.getAttemptsByUserId(userId);
        return new ResponseEntity<>(attempts, HttpStatus.OK);
    }

    /**
     * Creates a new attempt.
     *
     * @param form the AttemptForm containing attempt details
     * @return ResponseEntity containing the created AttemptDTO and HTTP status
     */
    @PostMapping(value = "/attempt")
    public ResponseEntity<AttemptDTO> createAttempt(@Valid @RequestBody
                                                    AttemptForm form) {
        AttemptDTO attempt = this.attemptService.createAttempt(
                new AttemptDTO(null, form.attempt_date(), form.content(),
                        form.userId(), form.title(), form.description(),
                        form.categories(), form.complexity()));
        return new ResponseEntity<>(attempt, HttpStatus.OK);
    }
}
