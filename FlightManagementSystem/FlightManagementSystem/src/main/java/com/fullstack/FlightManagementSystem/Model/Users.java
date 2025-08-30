package com.fullstack.FlightManagementSystem.Model;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(unique = true)
	private String email;
	@Column(nullable = false)
	private String password;
	private String name;
	 @Enumerated(EnumType.STRING)  
	private UserRole role;
	@CreationTimestamp	//Automatically sets when record is created
    @Column(updatable = false, nullable = false)
	private LocalDateTime createdAt;
	@UpdateTimestamp		//Automatically sets when record is updated
	private LocalDateTime updatedAt;
	@OneToMany(mappedBy = "user")
	private List<Passengers> passengers;
}
