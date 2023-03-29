package pestap.snakebackend.score.entity;

import javax.persistence.*;
import lombok.*;
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

@Entity
@Table(name="scores")
public class Score {

    /**
     * Particular score's unique ID
     */
    @Id
    @Column(unique = true, name="id")
    private UUID id;

    /**
     * Score value
     */
    @Column(name="value")
    private int value;

    /**
     * date of achievment
     */
    @Column(name="date")
    private LocalDate date;

    /**
     * Player who achieved the score
     */
    @ManyToOne
    @JoinColumn(name="player")
    private Player player;

}
