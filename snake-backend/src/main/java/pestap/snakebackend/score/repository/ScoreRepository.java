package pestap.snakebackend.score.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pestap.snakebackend.player.entity.Player;
import pestap.snakebackend.score.entity.Score;

import java.util.List;
import java.util.UUID;

@Repository
public interface ScoreRepository extends JpaRepository<Score, UUID> {
    List<Score> findAllByPlayer(Player player);
}
