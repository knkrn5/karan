package java_backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.crypto.bcrypt.BCrypt;

// import static java_backend.configs.EnvConfig.dotenv;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class UserModel {

    public enum Role {
        USER
    }

    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;

    @Column(nullable = false, length = 100)
    private String firstName;

    @Column(nullable = true, length = 100)
    private String lastName;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = true)
    private String refreshToken;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // setter and getter
    public void setEmail(String email) {
        this.email = email.toLowerCase();
    }

    public String getEmail() {
        return email.toLowerCase();
    }

    // Automatically hash the password
    public void setPassword(String password) {
        this.password = BCrypt.hashpw(password, BCrypt.gensalt(10));
    }

    // Optional: a method to verify a plain password with the hashed one
    public boolean checkPassword(String rawPassword) {
        return BCrypt.checkpw(rawPassword, this.password);
    }

    public String createAccessToken() {
        try {
            Algorithm algorithm = Algorithm.HMAC256(System.getProperty("ACCESS_TOKEN_SECRET"));

            return JWT.create()
                    .withIssuer(System.getProperty("JWT_ISSUER"))
                    .withSubject(this.email)
                    .withClaim("id", this.id.toString())
                    .withClaim("email", this.email)
                    .withClaim("role", this.role.name())
                    .withIssuedAt(new Date())
                    .withNotBefore(new Date(System.currentTimeMillis()))
                    .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000L))
                    .withJWTId(UUID.randomUUID().toString())
                    .sign(algorithm);
        } catch (Exception e) {
            e.printStackTrace();
            return "failed to generate accessToken";
        }
    }

    public String createRefreshToken() {
        try {
            Algorithm algorithm = Algorithm.HMAC256(System.getProperty("REFRESH_TOKEN_SECRET"));

            return JWT.create()
                    .withIssuer(System.getProperty("JWT_ISSUER"))
                    .withSubject(this.email)
                    .withClaim("id", this.id.toString())
                    .withClaim("email", this.email)
                    .withClaim("role", this.role.name())
                    .withIssuedAt(new Date())
                    .withNotBefore(new Date(System.currentTimeMillis()))
                    .withExpiresAt(new Date(System.currentTimeMillis() + 17 * 24 * 60 * 60 * 1000L))
                    .withJWTId(UUID.randomUUID().toString())
                    .sign(algorithm);
        } catch (Exception e) {
            e.printStackTrace();
            return "failed to generate accessToken";
        }
    }

}
