package pestap.snakebackend.score.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pestap.snakebackend.score.dto.GetScoresResponse;
import pestap.snakebackend.score.entity.Score;
import pestap.snakebackend.score.service.ScoreService;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {
    private ScoreService scoreService;

    @Autowired
    public ScoreController(ScoreService scoreService){
        this.scoreService = scoreService;
    }

    @GetMapping("/top/{number}")
    public ResponseEntity<GetScoresResponse> getTopScores(@PathVariable("number") int number) {
        return ResponseEntity.ok(GetScoresResponse.entityToDtoMapper().apply(scoreService.findTop(number)));
    }
}
