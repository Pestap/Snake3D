package pestap.snakebackend.score.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pestap.snakebackend.score.entity.Score;

import java.util.UUID;

@Repository
public interface ScoreRepository extends JpaRepository<Score, UUID> {

}
