package com.fullstack.FlightManagementSystem.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.FlightManagementSystem.Model.ApiResponse;
import com.fullstack.FlightManagementSystem.Model.Passengers;
import com.fullstack.FlightManagementSystem.Model.UserRole;
import com.fullstack.FlightManagementSystem.Model.Users;
import com.fullstack.FlightManagementSystem.Service.PassengerService;
import com.fullstack.FlightManagementSystem.Service.UserService;

@RestController
@RequestMapping("/FMS/Passenger")
public class PassengerController {

	@Autowired
	private PassengerService ps;
	@Autowired
	private UserService us;
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
	@GetMapping("/findAll")
	public ResponseEntity<ApiResponse<List<Passengers>>> findAll(){
		return ps.findAll();
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or hasRole('CUSTOMER')")
	@GetMapping("/findByFirstName")
	public ResponseEntity<ApiResponse<List<Passengers>>> findByFirstName(@RequestParam String firstName){
		return ps.findByFirstName(firstName);
	}
	@PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or (hasRole('CUSTOMER') and @passengerService.belongsToCurrentUser(#id))")
	@GetMapping("/find/{id}")
	public ResponseEntity<ApiResponse<Passengers>> findById(@PathVariable int id){
		return ps.findById(id);
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or hasRole('CUSTOMER')")
	@PostMapping("/save")
	public ResponseEntity<ApiResponse<Passengers>> save(@RequestBody Passengers passenger){
		// Get current authentication
		Authentication a=SecurityContextHolder.getContext().getAuthentication();
		// Get current user details
		Users u=us.findByEmail(a.getName());
		// If current user is CUSTOMER, ensure they can only save passengers under their own account
		if(u.getRole()==UserRole.CUSTOMER) {
			passenger.setUser(u);
		}
		// ADMIN and STAFF can save passengers for any user (passenger.getUser() remains as provided)
		return ps.save(passenger);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<ApiResponse<String>> delete(@PathVariable int id){
		return ps.deleteData(id);
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or (hasRole('CUSTOMER') and @passengerService.belongsToCurrentUser(#id))")
	@PutMapping("/updatePassenger/{id}")
	public ResponseEntity<ApiResponse<Passengers>> update(@PathVariable int id,@RequestBody Passengers request) {
	    return ps.updateData(id, request);
	}
	
}
