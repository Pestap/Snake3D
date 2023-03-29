package pestap.snakebackend.player.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pestap.snakebackend.player.entity.Player;

@Repository
public interface PlayerRepository extends JpaRepository<Player, String> {
    
}
