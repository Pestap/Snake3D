package pestap.snakebackend.score.dto;

import lombok.*;
import pestap.snakebackend.score.entity.Score;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.function.Function;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
@EqualsAndHashCode
public class GetScoresResponse {
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @ToString
    @EqualsAndHashCode
    /**
     * Static class for score entry in GET response
     */
    public static class ScoreEntry{
        private UUID id;
        private int scoreValue;
        private LocalDate achieveDate;
        private String playerUsername;
    }

    @Singular
    private List<ScoreEntry> scores;

    public static Function<Collection<Score>, GetScoresResponse> entityToDtoMapper(){
        return scores -> {
            GetScoresResponseBuilder response = GetScoresResponse.builder();
            scores.stream()
                    .map(score -> ScoreEntry.builder()
                            .id(score.getId())
                            .scoreValue(score.getScoreValue())
                            .achieveDate(score.getAchieveDate())
                            .playerUsername(score.getPlayer().getUsername())
                            .build()
                    ).forEach(response::score);
            return response.build();
        };
    }

}
