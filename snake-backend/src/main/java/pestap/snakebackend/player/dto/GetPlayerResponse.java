package pestap.snakebackend.player.dto;

import lombok.*;
import pestap.snakebackend.player.entity.Player;

import java.util.function.Function;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
@EqualsAndHashCode
public class GetPlayerResponse {
    private String username;
    private String password;

    public static Function<Player, GetPlayerResponse> entityToDtoMapper(){
        return player -> GetPlayerResponse.builder()
                .username(player.getUsername())
                .password(player.getPassword())
                .build();
    }
}
