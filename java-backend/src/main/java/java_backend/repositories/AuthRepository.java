package java_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import java_backend.models.UserModel;

import java.util.Optional;
import java.util.UUID;

public interface AuthRepository extends JpaRepository<UserModel, UUID> {
    // other methods

    Optional<UserModel> findByEmail(String email);

}
