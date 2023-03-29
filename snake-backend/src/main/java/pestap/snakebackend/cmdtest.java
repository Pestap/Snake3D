package pestap.snakebackend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Scanner;

@Component
public class cmdtest implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception{
        System.out.println("SIEMA APKKA");
        String input = (new Scanner(System.in)).nextLine();
    }

}
