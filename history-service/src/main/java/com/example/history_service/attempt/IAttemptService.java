package com.example.history_service.attempt;

import com.example.history_service.attempt.models.AttemptDTO;

import java.util.List;

public interface IAttemptService {
    AttemptDTO getAttemptById(String id);
    List<AttemptDTO> getAttemptsByUserId(String userId);
    void createAttempt(AttemptDTO dto);
}
