package com.fullstack.FlightManagementSystem.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
	@NotBlank(message = "Email is Required")
	@Email(message = "Email should be valid")
	private String email;
	@NotBlank(message = "Password is required")
	private String password;
}

//✅ Why DTOs are important:
//•  Separation of concerns: API data separate from database entities
//•  Validation: Built-in request validation
//•  Security: Don't expose internal entity structure
//•  Flexibility: Can change without affecting database model