package com.example.history_service.attempt;

import com.example.history_service.attempt.models.Attempt;
import com.example.history_service.attempt.models.AttemptDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttemptService implements IAttemptService {
    private AttemptRepository attemptRepository;
    @Autowired
    public AttemptService(AttemptRepository attemptRepository) {
        this.attemptRepository = attemptRepository;
    }
    public AttemptDTO getAttemptById(String id) {
        Attempt attempt = this.attemptRepository.findById(id)
                .orElseThrow(() -> new AttemptNotFoundException("Attempt not found"));
        return new AttemptDTO(attempt.getId(), attempt.getAttempt_date(), attempt.getContent(), attempt.getUserId(),
                attempt.getTitle(), attempt.getCategories(), attempt.getComplexity());
    }

    public List<AttemptDTO> getAttemptsByUserId(String userId) {
        return this.attemptRepository.findByUserId(userId)
                .stream()
                .map(attempt -> new AttemptDTO(
                        attempt.getId(),
                        attempt.getAttempt_date(),
                        attempt.getContent(),
                        attempt.getUserId(),
                        attempt.getTitle(),
                        attempt.getCategories(),
                        attempt.getComplexity()
                ))
                .collect(Collectors.toList());
    }

    public void createAttempt(AttemptDTO dto) {
        this.attemptRepository.insert(new Attempt(dto.id(), dto.attemptDate(), dto.content(), dto.userId(), dto.title(),
                dto.categories(), dto.complexity()));
    }
}
