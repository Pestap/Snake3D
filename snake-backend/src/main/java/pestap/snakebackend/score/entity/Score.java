package pestap.snakebackend.score.entity;


import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;
import pestap.snakebackend.player.entity.Player;

import java.time.LocalDate;
import java.util.Locale;
import java.util.UUID;

/**
 * Entity representing a particular score
 */
@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@SuperBuilder

@Entity
@Table(name="scores")
public class Score {

    /**
     * Particular score's unique ID
     */
    @Id
    @Column(unique = true)
    private UUID id;

    /**
     * Score value
     */
    @Column(name="scoreValue")
    private int scoreValue;

    /**
     * date of achievment
     */
    @Column(name="achieveDate")
    private LocalDate achieveDate;

    /**
     * Player who achieved the score
     */
    @ManyToOne
    @JoinColumn(name="player")
    private Player player;

}
