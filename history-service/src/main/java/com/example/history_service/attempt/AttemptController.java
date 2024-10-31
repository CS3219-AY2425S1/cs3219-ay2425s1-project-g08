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

@CrossOrigin(origins="*")
@RestController
public class AttemptController {
    private IAttemptService attemptService;
    @Autowired
    public AttemptController(IAttemptService attemptService) {
        this.attemptService = attemptService;
    }

    @GetMapping(value="/attempt/{id}")
    public ResponseEntity<AttemptDTO> getAttemptById(@PathVariable("id") String id) {
        AttemptDTO attempt = this.attemptService.getAttemptById(id);
        return new ResponseEntity<>(attempt, HttpStatus.OK);
    }

    @GetMapping(value="/{userId}/attempts")
    public ResponseEntity<List<AttemptDTO>> getAttemptsByUserId(@PathVariable("userId") String userId) {
        List<AttemptDTO> attempts = this.attemptService.getAttemptsByUserId(userId);
        return new ResponseEntity<>(attempts, HttpStatus.OK);
    }

    @PostMapping(value="/attempt")
    public ResponseEntity<AttemptDTO> createAttempt(@Valid @RequestBody AttemptForm form) {
        AttemptDTO attempt = this.attemptService.createAttempt(new AttemptDTO(null, form.attempt_date(), form.content(), form.userId(),
                form.title(), form.categories(), form.complexity()));
        return new ResponseEntity<>(attempt, HttpStatus.OK);
    }
}
