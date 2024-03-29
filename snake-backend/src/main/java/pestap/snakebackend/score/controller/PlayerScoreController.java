package pestap.snakebackend.score.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import pestap.snakebackend.player.entity.Player;
import pestap.snakebackend.player.service.PlayerService;
import pestap.snakebackend.score.dto.CreateScoreRequest;
import pestap.snakebackend.score.dto.GetScoreResponse;
import pestap.snakebackend.score.entity.Score;
import pestap.snakebackend.score.service.ScoreService;

import java.util.Optional;

@RestController
@RequestMapping("/api/players/{playerUsername}/scores")
public class PlayerScoreController {

    private PlayerService playerService;
    private ScoreService scoreService;

    @Autowired
    public PlayerScoreController(PlayerService playerService, ScoreService scoreService){
        this.playerService = playerService;
        this.scoreService = scoreService;
    }

    @GetMapping("/highscore")
    public ResponseEntity<GetScoreResponse> getHighscore(@PathVariable("playerUsername") String username){
        Optional<Player> player = playerService.find(username);
        return player.map(foundPlayer -> ResponseEntity
                        .ok(GetScoreResponse.entityToDtoMapper()
                            .apply(scoreService.findUserHighscore(foundPlayer).get())))
                        .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping
    public ResponseEntity<Void> createScore(@PathVariable("playerUsername") String username,
                                            @RequestBody CreateScoreRequest request,
                                            UriComponentsBuilder builder){
        Optional<Player> player = playerService.find(username);

        if(player.isPresent()){
            Score scoreToAdd = CreateScoreRequest
                    .dtoToEntityMapper(playerUsername -> playerService.find(username).orElseThrow())
                    .apply(request);
            Score addedScore = scoreService.createScore(scoreToAdd);

            return ResponseEntity.created(builder.pathSegment("api", "players", "{username}", "scores", "{scoreId}")
                    .buildAndExpand(player.get().getUsername(), addedScore.getId()).toUri()).build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }
}
