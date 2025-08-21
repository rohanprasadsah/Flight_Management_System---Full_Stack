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
import com.fullstack.FlightManagementSystem.Model.Flight;
import com.fullstack.FlightManagementSystem.Model.Passengers;
import com.fullstack.FlightManagementSystem.Repository.FlightRepository;
import com.fullstack.FlightManagementSystem.Repository.PRepo;

@Service
public class FlightService {
	@Autowired
	private FlightRepository fr;
	
	@Autowired
	private PRepo pr;

	public ResponseEntity<ApiResponse<Flight>> findFlightById(int id) {
		Optional<Flight> o=fr.getflightbyid(id);
		if(!o.isPresent()) {
			throw new IdNotFoundException(id+"Invalid Id");
		}
		ApiResponse<Flight> api= new ApiResponse<Flight>(HttpStatus.FOUND.value(),"Data Found",o.get());
		return new ResponseEntity<ApiResponse<Flight>>(api,HttpStatus.FOUND);
	}
	
	public ResponseEntity<ApiResponse<List<Flight>>> findFlightBySourceAndDestination(String source,String destination){
		List<Flight> o=fr.findBySourceAndDestination(source, destination);
		if(o.isEmpty()) {
			throw new ResourceNotFoundException("Resource Not Found or Invalid Input");
		}
		ApiResponse<List<Flight>> api=new ApiResponse<List<Flight>>(HttpStatus.FOUND.value(),"Data Found",o);
		return new ResponseEntity<ApiResponse<List<Flight>>>(api ,HttpStatus.FOUND);
	}
	
	public ResponseEntity<ApiResponse<List<Flight>>> findAll(){
		List<Flight> l=fr.findAll();
		if(l.isEmpty()) {
			throw new ResourceNotFoundException("No Records Found");
		}
		ApiResponse<List<Flight>> api=new ApiResponse<List<Flight>>(HttpStatus.OK.value(),"Data Found",l);
		return new ResponseEntity<ApiResponse<List<Flight>>>(api,HttpStatus.OK);
	}
	
	public ResponseEntity<ApiResponse<Flight>> update(Flight f, int id) {
		Optional<Flight> o=fr.getflightbyid(id);
		if(!o.isPresent()) {
			throw new IdNotFoundException(id+" : Invalid Id");
		}
		return fr.saveData(f);
	}
	
	public ResponseEntity<ApiResponse<Flight>> saveData(Flight f) {
		return fr.saveData(f);
	}
	
	public ResponseEntity<ApiResponse<String>> deleteData(int id) {
		Optional<Flight> o=fr.getflightbyid(id);
		if(!o.isPresent()) {
			throw new IdNotFoundException(id+" : Invalid Id");
		}
		fr.deleteFlight(o.get());
		ApiResponse<String> api=new ApiResponse<String>(HttpStatus.OK.value(),"Data Deleted","Flight with id : "+id+" got deleted");
		return new ResponseEntity<ApiResponse<String>>(api,HttpStatus.OK);
	}
	
	//Saving passenger when the flight is available
	public ResponseEntity<ApiResponse<Passengers>> savePassengerWithFlight(int id, Passengers p){
		Flight f=fr.getflightbyid(id).orElseThrow(()-> new IdNotFoundException(id+" : Invalid Flight Id"));
			p.setFlight(f);
			Passengers passenger= pr.save(p);
			ApiResponse<Passengers> api=new ApiResponse<Passengers>(HttpStatus.CREATED.value(),"Passenger Data Saved",passenger);
			return new ResponseEntity<ApiResponse<Passengers>>(api, HttpStatus.CREATED);
	}

}
