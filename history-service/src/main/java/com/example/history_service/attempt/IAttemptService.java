package com.example.history_service.attempt;

import java.util.List;

public interface IAttemptService {
    AttemptDTO getAttemptById(String id);
    List<AttemptDTO> getAttemptsByUserId(String userId);
    void createAttempt(AttemptDTO dto);
}
