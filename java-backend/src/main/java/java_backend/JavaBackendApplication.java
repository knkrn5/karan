package java_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import org.springframework.context.annotation.Bean;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class JavaBackendApplication {

	public static void main(String[] args) {

		Dotenv.configure()
				.directory("./")
				.filename(".env")
				.ignoreIfMissing()
				.systemProperties()
				.load();

		// System.out.println("Loaded environment variables:");

		// for (DotenvEntry e : dotenv.entries()) {
		// System.out.println(e);
		// }

		// dotenv.entries(Dotenv.Filter.DECLARED_IN_ENV_FILE).forEach(e -> {
		// // System.out.println(e.getKey() + ": " + e.getValue());
		// System.out.println(e.getKey());
		// });

		System.out.println("====== Custom App ENV Properties ======");
		System.getProperties().forEach((key, value) -> {
			if (key.toString().matches("^[A-Z0-9_]+$")) {
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
								"PRODUCTION".equals(System.getProperty("ENV")) ? "https://karan.email"
										: "http://localhost:5173")
						.allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("*")
						.allowCredentials(true)
						.exposedHeaders("Authorization", "Content-Type");
			}
		};
	}
}
