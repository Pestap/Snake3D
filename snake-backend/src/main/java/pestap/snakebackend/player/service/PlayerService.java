package pestap.snakebackend.player.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pestap.snakebackend.player.entity.Player;
import pestap.snakebackend.player.repository.PlayerRepository;

import java.util.Optional;

@Service
public class PlayerService {
    private PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository){
        this.playerRepository = playerRepository;
    }
    public Optional<Player> find(String username){
        return playerRepository.findById(username);
    }

    @Transactional
    public Player createPlayer(Player newPlayer){
        return playerRepository.save(newPlayer);
    }

    @Transactional
    public void updatePlayer(Player player){
        playerRepository.save(player);
    }

    @Transactional
    public void deletePlayer(String username){
        playerRepository.deleteById(username);
    }

}
