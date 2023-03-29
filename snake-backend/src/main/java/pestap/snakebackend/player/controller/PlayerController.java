package pestap.snakebackend.player.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pestap.snakebackend.player.dto.GetPlayerResponse;
import pestap.snakebackend.player.service.PlayerService;

@RestController
@RequestMapping("/api/players")
public class PlayerController {
    private PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService){
        this.playerService = playerService;
    }

    @GetMapping("{username}")
    public ResponseEntity<GetPlayerResponse> getPlayer(@PathVariable("username") String username){
        return playerService.find(username)
                .map(player -> ResponseEntity
                        .ok(GetPlayerResponse
                        .entityToDtoMapper().apply(player)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
