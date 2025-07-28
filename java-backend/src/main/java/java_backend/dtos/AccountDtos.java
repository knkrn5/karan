package java_backend.dtos;

import java_backend.models.UserModel;

public class AccountDtos {

    private AccountDtos() {
        // Private constructor to prevent instantiation
    }

    public static class RequiredUserDataDto {
        public final String firstName;
        public final String lastName;
        public final String email;

        public RequiredUserDataDto(UserModel userData) {
            this.firstName = userData.getFirstName();
            this.lastName = userData.getLastName();
            this.email = userData.getEmail();
        }
    }

}
