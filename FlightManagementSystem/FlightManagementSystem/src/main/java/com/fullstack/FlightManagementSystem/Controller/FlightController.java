package com.fullstack.FlightManagementSystem.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.FlightManagementSystem.Model.ApiResponse;
import com.fullstack.FlightManagementSystem.Model.Flight;
import com.fullstack.FlightManagementSystem.Model.Passengers;
import com.fullstack.FlightManagementSystem.Model.UserRole;
import com.fullstack.FlightManagementSystem.Model.Users;
import com.fullstack.FlightManagementSystem.Service.FlightService;
import com.fullstack.FlightManagementSystem.Service.UserService;

@RestController
@RequestMapping("/FMS")
public class FlightController {
	
	@Autowired
	private FlightService fs;
	@Autowired
	private UserService us;
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/save")
	public ResponseEntity<ApiResponse<Flight>> save(@RequestBody Flight f) {
		return fs.saveData(f);
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or hasRole('CUSTOMER')")
	@GetMapping("/find/{id}")
	public ResponseEntity<ApiResponse<Flight>> findById(@PathVariable int id) {
		return fs.findFlightById(id);
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or hasRole('CUSTOMER')")
	@GetMapping("/findBySource&Destination")
	public ResponseEntity<ApiResponse<List<Flight>>> findBySourceAndDestination(@RequestParam String source,@RequestParam String destination){
		return fs.findFlightBySourceAndDestination(source, destination);
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or hasRole('CUSTOMER')")
	@GetMapping("/findAll")
	public ResponseEntity<ApiResponse<List<Flight>>> findAll() {
		return fs.findAll();
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
	@PutMapping("/putUpdate/{id}")
	public ResponseEntity<ApiResponse<Flight>> update(@RequestBody Flight f, @PathVariable int id) {
		f.setF_id(id);
		return fs.update(f, id);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<ApiResponse<String>> delete(@PathVariable int id) {
		return fs.deleteData(id);
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or hasRole('CUSTOMER')")
	@PostMapping("/savePassenger/{id}")
	public ResponseEntity<ApiResponse<Passengers>> savePassengerWithFlight(@PathVariable int id,@RequestBody Passengers p){
		Authentication a=SecurityContextHolder.getContext().getAuthentication();
		String email=a.getName();
		Users u=us.findByEmail(email);
		if(u.getRole()==UserRole.CUSTOMER) {
			p.setUser(u);
		}
		return fs.savePassengerWithFlight(id, p);
	}
	
}
