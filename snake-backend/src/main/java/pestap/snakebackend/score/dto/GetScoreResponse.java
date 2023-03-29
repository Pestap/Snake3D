package pestap.snakebackend.score.dto;

import lombok.*;
import pestap.snakebackend.player.entity.Player;
import pestap.snakebackend.score.entity.Score;

import java.time.LocalDate;
import java.util.UUID;
import java.util.function.Function;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
@EqualsAndHashCode
public class GetScoreResponse {
    private UUID id;
    private int scoreValue;
    private LocalDate achieveDate;
    private String player;

    public static Function<Score, GetScoreResponse> entityToDtoMapper(){
        return score -> GetScoreResponse.builder()
                .id(score.getId())
                .scoreValue(score.getScoreValue())
                .achieveDate(score.getAchieveDate())
                .player(score.getPlayer().getUsername())
                .build();
    }

}
