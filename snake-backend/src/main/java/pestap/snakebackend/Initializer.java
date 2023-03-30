package pestap.snakebackend;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pestap.snakebackend.player.entity.Player;
import pestap.snakebackend.player.service.PlayerService;
import pestap.snakebackend.score.entity.Score;
import pestap.snakebackend.score.service.ScoreService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.UUID;

@Component
public class Initializer {
    private final PlayerService playerService;
    private final ScoreService scoreService;

    @Autowired
    public Initializer(PlayerService playerService, ScoreService scoreService){
        this.playerService = playerService;
        this.scoreService = scoreService;
    }

    @PostConstruct
    private synchronized void init(){
        Player p1 = Player.builder()
                .username("ADMIN")
                .password("PASSWORD")
                .scoreList(new ArrayList<Score>())
                .build();

        Score s1 = Score.builder()
                .id(UUID.randomUUID())
                .scoreValue(8)
                .achieveDate(LocalDate.of(2023, 3, 12))
                .player(p1)
                .build();
        Score s2 = Score.builder()
                .id(UUID.randomUUID())
                .scoreValue(1)
                .achieveDate(LocalDate.of(2023, 3, 12))
                .player(p1)
                .build();
        Score s3 = Score.builder()
                .id(UUID.randomUUID())
                .scoreValue(2)
                .achieveDate(LocalDate.of(2023, 3, 12))
                .player(p1)
                .build();
        Score s4 = Score.builder()
                .id(UUID.randomUUID())
                .scoreValue(3)
                .achieveDate(LocalDate.of(2023, 3, 12))
                .player(p1)
                .build();



        playerService.createPlayer(p1);
        p1.getScoreList().add(s1);
        p1.getScoreList().add(s2);
        p1.getScoreList().add(s3);
        p1.getScoreList().add(s4);
        scoreService.createScore(s1);
        scoreService.createScore(s2);
        scoreService.createScore(s3);
        scoreService.createScore(s4);

    }
}
