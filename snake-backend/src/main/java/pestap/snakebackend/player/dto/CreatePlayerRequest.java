package pestap.snakebackend.player.dto;

import lombok.*;
import pestap.snakebackend.player.entity.Player;
import pestap.snakebackend.score.entity.Score;

import java.util.List;
import java.util.function.Function;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
@EqualsAndHashCode
public class CreatePlayerRequest {
    private String username;
    private String password;
    private List<Score> scoreList;

    public static Function<CreatePlayerRequest, Player> dtoToEntityMapper(){
        return request -> Player.builder()
                .username(request.getUsername())
                .password(request.getPassword())
                .scoreList(request.getScoreList())
                .build();
    }
}
