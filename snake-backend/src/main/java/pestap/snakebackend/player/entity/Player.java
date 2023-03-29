package pestap.snakebackend.player.entity;

import jakarta.persistence.Table;
import lombok.*;
import jakarta.persistence.*;

import pestap.snakebackend.score.entity.Score;

import java.io.Serializable;
import java.util.List;

/**
 * Entity representing a particular player
 */
@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@EqualsAndHashCode
@ToString

@Entity
@Table(name="players")
public class Player{


    /**
     * username used to login
     */
    @Id
    @Column(unique = true, name = "username")
    private String username;

    /**
     * password hash
     */
    @Column(name = "password")
    private String password;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "player")
    private List<Score> scoreList;

}
