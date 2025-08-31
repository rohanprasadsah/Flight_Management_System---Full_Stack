package com.fullstack.FlightManagementSystem.DTO;

import com.fullstack.FlightManagementSystem.Model.UserRole;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
	private String token;		//The actual JWT token string
	private String type;			//Always "Bearer" (standard JWT type)
	private int id;				//User's database ID
	private String email;		//User's email address
	private String name;			//User's display name
	private UserRole role;		//User's role (ADMIN, STAFF, CUSTOMER)
	private long expiresIn;		//Token expiration time in milliseconds
	
}
