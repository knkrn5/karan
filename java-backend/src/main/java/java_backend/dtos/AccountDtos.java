package java_backend.dtos;

import lombok.Data;

import java_backend.models.UserModel;

public class AccountDtos {

    private AccountDtos() {
        // Private constructor to prevent instantiation
    }

    @Data
    public static class RequiredUserDataDto {
        private String firstName;
        private String lastName;
        private String email;

        public RequiredUserDataDto() { // NO-ARG constructor for Jackson
        }

        public RequiredUserDataDto(UserModel userData) {
            this.firstName = userData.getFirstName();
            this.lastName = userData.getLastName();
            this.email = userData.getEmail();
        }
    }

}
