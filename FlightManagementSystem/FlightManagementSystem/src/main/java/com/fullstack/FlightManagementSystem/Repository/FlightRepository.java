package com.fullstack.FlightManagementSystem.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.fullstack.FlightManagementSystem.Model.ApiResponse;
import com.fullstack.FlightManagementSystem.Model.Flight;

@Repository
public class FlightRepository {
	@Autowired
	private FRepo fr;
	
	public Optional<Flight> getflightbyid(int id){
		return fr.findById(id);
	}
	public List<Flight> findBySourceAndDestination(String source, String Destination){
		return fr.findBySourceAndDestination(source, Destination);
	}
	public List<Flight> findAll(){
		return fr.findAll();
	}
	public void deleteFlight(Flight flight) {
		fr.delete(flight);
	}
	public ResponseEntity<ApiResponse<Flight>> saveData(Flight flight) {
		Flight f=fr.save(flight);
		ApiResponse<Flight> api=new ApiResponse<Flight>(HttpStatus.CREATED.value(),"Data Saved",f);
		return new ResponseEntity<ApiResponse<Flight>>(api,HttpStatus.CREATED);
	}
	
}
