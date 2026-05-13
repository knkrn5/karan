package java_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import org.springframework.context.annotation.Bean;

import io.github.cdimascio.dotenv.Dotenv;
import java_backend.configs.EnvConfig;

@SpringBootApplication
@RestController
public class JavaBackendApplication {

	public static void main(String[] args) {

		Dotenv.configure()
				.directory("./")
				.filename(".env")
				.ignoreIfMissing()
				.systemProperties()
				.load();

		// System.out.println("====== Custom App ENV Properties ======");
		System.getenv().forEach((key, value) -> {
			if (key.matches("^[A-Z0-9_]+$")) {
				System.out.println(key + " = " + value);
			}
		});

		SpringApplication.run(JavaBackendApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins(
								"https://ka-ran.me",
								"https://www.ka-ran.me"
						)
						.allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("*")
						.allowCredentials(true)
						.exposedHeaders("Authorization", "Content-Type");
			}
		};
	}

	@GetMapping("/")
	public String home() {
		return "🚀 Java Backend is running successfully!";
	}

	@GetMapping("/health")
	public String healthCheck() {
		return "✅ API3 is healthy!";
	}
}
