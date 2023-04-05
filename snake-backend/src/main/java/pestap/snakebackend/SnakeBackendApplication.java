package pestap.snakebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SnakeBackendApplication {

    public static void main(String[] args) {
        System.out.println("SIEMA");
        SpringApplication.run(SnakeBackendApplication.class, args);
    }

    // TODO: add cors web filter
}
