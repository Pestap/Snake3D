package pestap.snakebackend.score.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pestap.snakebackend.player.entity.Player;
import pestap.snakebackend.score.entity.Score;
import pestap.snakebackend.score.repository.ScoreRepository;

import java.util.*;

@Service
public class ScoreService {
    private ScoreRepository scoreRepository;

    @Autowired
    public ScoreService(ScoreRepository scoreRepository){
        this.scoreRepository = scoreRepository;
    }

    public Optional<Score> find(UUID id){
        return scoreRepository.findById(id);
    }

    public Optional<Score> findUserHighscore(Player player){
        ArrayList<Score> userScores = new ArrayList<>(scoreRepository.findAllByPlayer(player));

        if (!userScores.isEmpty()){
            Score highscore = userScores.get(0);

            for(Score e : userScores){
                if (e.getScoreValue() >= highscore.getScoreValue()){
                    highscore = e;
                }
            }
            return Optional.of(highscore);
        }

        return Optional.empty();

    }

    public List<Score> findTop(int number){
        ArrayList<Score> scores = new ArrayList<>(scoreRepository.findAll());
        Collections.sort(scores, (s1, s2) -> {
            return s2.getScoreValue() - s1.getScoreValue();
        });

        List<Score> top_scores = scores.subList(0, number);
        return top_scores;
    }
    @Transactional
    public Score createScore(Score score){
        return scoreRepository.save(score);
    }

    @Transactional
    public void deleteScore(UUID id){
        scoreRepository.deleteById(id);
    }
}
