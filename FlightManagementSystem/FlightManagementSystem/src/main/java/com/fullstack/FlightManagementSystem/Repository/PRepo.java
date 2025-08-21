package com.fullstack.FlightManagementSystem.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fullstack.FlightManagementSystem.Model.Passengers;

@Repository
public interface PRepo extends JpaRepository<Passengers, Integer>{
	List<Passengers> findByFirstName(String firstName);
}
