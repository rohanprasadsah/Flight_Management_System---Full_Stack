package com.fullstack.FlightManagementSystem.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fullstack.FlightManagementSystem.Model.Flight;

public interface FRepo extends JpaRepository<Flight, Integer> {
	List<Flight> findBySourceAndDestination(String source, String destination);
}
