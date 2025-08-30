package com.fullstack.FlightManagementSystem.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fullstack.FlightManagementSystem.Exception.IdNotFoundException;
import com.fullstack.FlightManagementSystem.Exception.ResourceNotFoundException;
import com.fullstack.FlightManagementSystem.Model.ApiResponse;
import com.fullstack.FlightManagementSystem.Model.Passengers;
import com.fullstack.FlightManagementSystem.Repository.PRepo;
import org.springframework.util.StringUtils;

@Service
public class PassengerService {
	
	@Autowired
	private PRepo pr;
	
	public ResponseEntity<ApiResponse<List<Passengers>>> findAll(){
		List<Passengers> pl=pr.findAll();
		if(pl.isEmpty()) {
			throw new ResourceNotFoundException("No Passengers Found");
		}
		ApiResponse<List<Passengers>> api=new ApiResponse<List<Passengers>>(HttpStatus.FOUND.value(),"Passengers Found",pl);
		return new ResponseEntity<ApiResponse<List<Passengers>>>(api,HttpStatus.FOUND);
	}
	
	public ResponseEntity<ApiResponse<Passengers>> save(Passengers passenger){
		Passengers p=pr.save(passenger);
		ApiResponse<Passengers> api=new ApiResponse<Passengers>(HttpStatus.OK.value(),"Data Saved",p);
		return new ResponseEntity<ApiResponse<Passengers>>(api,HttpStatus.OK);
	}
	
	public ResponseEntity<ApiResponse<Passengers>> updateData(int id,Passengers p){
		
		 Passengers existingP = pr.findById(id).get();
		 
//		 Definition : hasText(String str) → returns true if the "str" is not null, not empty, not just spaces.
//		 Package : org.springframework.util.StringUtils (Spring utility class)
//		 Purpose : Check if a string has meaningful text.
//		 When to Use : To check if a string has real text. To avoid saving empty or space-only values. To validate inputs like name, email, etc.
		 
		 if (StringUtils.hasText(p.getFirstName())) {
			existingP.setFirstName(p.getFirstName());
			}
		 if (StringUtils.hasText(p.getLastName())) {
			existingP.setLastName(p.getLastName());
		 }
		 if (p.getAge() > 0) {
		    existingP.setAge(p.getAge());
		 }
		ApiResponse<Passengers> api= new ApiResponse<Passengers>(HttpStatus.OK.value(),"Update Successfull",pr.save(existingP));
		return new ResponseEntity<ApiResponse<Passengers>>(api, HttpStatus.OK);
	}
	
	public ResponseEntity<ApiResponse<String>> deleteData(int id){
		Optional<Passengers> o=pr.findById(id);
		if(!o.isPresent()) {
			throw new IdNotFoundException(id+" : Invalid Id");
		}
		pr.delete(o.get());
		ApiResponse<String> api=new ApiResponse<String>(HttpStatus.OK.value(),"Data Deleted","Passenger with id : "+id+" got deleted");
		return new ResponseEntity<ApiResponse<String>>(api,HttpStatus.OK);
	}
	
	public ResponseEntity<ApiResponse<List<Passengers>>> findByFirstName(String firstName){
		List<Passengers> pl=pr.findByFirstName(firstName);
		if(pl.isEmpty()) {
			throw new ResourceNotFoundException("No Data Found");
		}
		ApiResponse<List<Passengers>> api=new ApiResponse<List<Passengers>>(HttpStatus.FOUND.value(),"Data Found",pl);
		return new ResponseEntity<ApiResponse<List<Passengers>>>(api,HttpStatus.FOUND);
	}

	public ResponseEntity<ApiResponse<Passengers>> findById(int id) {
		Optional<Passengers> o= pr.findById(id);
		if(o.isEmpty()) {
			throw new IdNotFoundException(id+" : Invalid Id");
		}
		ApiResponse<Passengers> api= new ApiResponse<Passengers>(HttpStatus.FOUND.value(),"Data Found",o.get());
		return new ResponseEntity<ApiResponse<Passengers>>(api,HttpStatus.FOUND);
	}

}
