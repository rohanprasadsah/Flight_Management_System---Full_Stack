package com.fullstack.FlightManagementSystem.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fullstack.FlightManagementSystem.Exception.ResourceNotFoundException;
import com.fullstack.FlightManagementSystem.Model.ApiResponse;
import com.fullstack.FlightManagementSystem.Model.UserRole;
import com.fullstack.FlightManagementSystem.Model.Users;
import com.fullstack.FlightManagementSystem.Repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository ur;
	@Autowired
	private PasswordEncoder pe;
	
	public Users registerUser(String name, String email, String password, UserRole role) {
		boolean b=ur.existsByEmail(email);
		if(b) {
			throw new RuntimeException("Email Already Exists");
		}
		Users u=new Users();
		u.setName(name);
		u.setEmail(email);
		u.setPassword(pe.encode(password));
		u.setRole(role);
		Users us=ur.save(u);
		return us;
//		ApiResponse<Users> api=new ApiResponse<Users>(HttpStatus.CREATED.value(),"User Registered",us);
//		return new ResponseEntity<ApiResponse<Users>>(api,HttpStatus.CREATED);
	}
	
	public Users findByEmail(String email){
		Optional<Users> o=ur.findByEmail(email);
		if(o.isEmpty()) {
			throw new ResourceNotFoundException("User Not Found !! Please Register First !!");
		}
		Users u=o.get();
		return u;
//		ApiResponse<Users> api=new ApiResponse<Users>(HttpStatus.FOUND.value(),"User Found",o.get());
//		return new ResponseEntity<ApiResponse<Users>>(api,HttpStatus.FOUND);
	}
	
	public boolean validatePassword(String rawPassword, String encodedPassword) {
		return pe.matches(rawPassword, encodedPassword);
	}
}












