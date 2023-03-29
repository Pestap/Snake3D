package pestap.snakebackend.score.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pestap.snakebackend.score.entity.Score;
import pestap.snakebackend.score.repository.ScoreRepository;

import java.util.UUID;

@Service
public class ScoreService {
    private ScoreRepository scoreRepository;

    @Autowired
    public ScoreService(ScoreRepository scoreRepository){
        this.scoreRepository = scoreRepository;
    }

    @Transactional
    public Score createScore(Score score){
        return scoreRepository.save(score);
    }

    @Transactional
    public void deleteScoer(UUID id){
        scoreRepository.deleteById(id);
    }
}
