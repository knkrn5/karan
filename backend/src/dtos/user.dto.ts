

export interface UserDTO {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
}


// 👉 **DTO (Data Transfer Object)** ensures that you only return the necessary fields to the frontend, making your API response clean & secure.
