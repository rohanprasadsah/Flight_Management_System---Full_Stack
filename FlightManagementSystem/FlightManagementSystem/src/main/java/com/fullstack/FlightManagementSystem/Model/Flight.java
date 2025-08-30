package com.fullstack.FlightManagementSystem.Model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Data

@NoArgsConstructor
@AllArgsConstructor
public class Flight {
	@jakarta.persistence.Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int f_id;
	
	private String name;
	private String source;
	private String destination;
	private String time;
	private BigDecimal price;
	private String img;

	@OneToMany(mappedBy = "flight", cascade = CascadeType.REMOVE, orphanRemoval = true)
	private List<Passengers> passengers = new ArrayList<>();
}
