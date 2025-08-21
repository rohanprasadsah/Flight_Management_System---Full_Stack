package com.fullstack.FlightManagementSystem.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.FlightManagementSystem.Model.ApiResponse;
import com.fullstack.FlightManagementSystem.Model.Passengers;
import com.fullstack.FlightManagementSystem.Service.PassengerService;

@RestController
@RequestMapping("/FMS/Passenger")
public class PassengerController {

	@Autowired
	private PassengerService ps;
	
	@GetMapping("/findAll")
	public ResponseEntity<ApiResponse<List<Passengers>>> findAll(){
		return ps.findAll();
	}
	
	@GetMapping("/findByFirstName")
	public ResponseEntity<ApiResponse<List<Passengers>>> findByFirstName(@RequestParam String firstName){
		return ps.findByFirstName(firstName);
	}
	
	@GetMapping("/find/{id}")
	public ResponseEntity<ApiResponse<Passengers>> findById(@PathVariable int id){
		return ps.findById(id);
	}
	
	@PostMapping("/save")
	public ResponseEntity<ApiResponse<Passengers>> save(@RequestBody Passengers passenger){
		return ps.save(passenger);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<ApiResponse<String>> delete(@PathVariable int id){
		return ps.deleteData(id);
	}

	@PatchMapping("/updatePassenger/{id}")
	public ResponseEntity<ApiResponse<Passengers>> update(@PathVariable int id,@RequestBody Passengers request) {
	    return ps.updateData(id, request);
	}
	
}
