package com.fullstack.FlightManagementSystem.DTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.FlightManagementSystem.Model.Users;
import com.fullstack.FlightManagementSystem.Security.JwtUtil;
import com.fullstack.FlightManagementSystem.Service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	private JwtUtil ju;
	@Autowired
	private UserService us;
	
	@PostMapping("/register")
	public ResponseEntity<AuthResponse> registerUser(@Valid @RequestBody RegisterRequest rru){
		Users ru=us.registerUser(rru.getName(), rru.getEmail(), rru.getPassword(), rru.getRole());
		String token=ju.generateToken(ru.getEmail());
		AuthResponse auth=AuthResponse.builder()
				.token(token)
				.type("Bearer")
				.email(ru.getEmail())
				.name(ru.getName())
				.role(ru.getRole())
				.expiresIn(86400000)
				.build();
//		return ResponseEntity.ok(auth);
		return new ResponseEntity<AuthResponse>(auth,HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> loginUser(@Valid @RequestBody LoginRequest lru){
		Users u=us.findByEmail(lru.getEmail());
		if(!us.validatePassword(lru.getPassword(), u.getPassword())) {
			throw new RuntimeException("Invalid credentials");
		}
		String token=ju.generateToken(u.getEmail());
		AuthResponse auth=new AuthResponse();
		auth.setToken(token);
		auth.setType("Bearer");
		auth.setEmail(u.getEmail());
		auth.setName(u.getName());
		auth.setRole(u.getRole());
		auth.setExpiresIn(86400000);
		return new ResponseEntity<AuthResponse>(auth,HttpStatus.OK);
	}
	
}








