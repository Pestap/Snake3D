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
public class CreateScoreRequest {
    private int scoreValue;
    private LocalDate achieveDate;
    private String playerUsername;


    public static Function<CreateScoreRequest, Score> dtoToEntityMapper(
            Function<String, Player> playerFunction
    ){
        return request -> Score.builder()
                .id(UUID.randomUUID())
                .scoreValue(request.getScoreValue())
                .achieveDate(request.getAchieveDate())
                .player(playerFunction.apply(request.getPlayerUsername()))
                .build();
    }
}
