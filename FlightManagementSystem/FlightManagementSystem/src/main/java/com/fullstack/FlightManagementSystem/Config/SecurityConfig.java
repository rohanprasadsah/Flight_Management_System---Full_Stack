package com.fullstack.FlightManagementSystem.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.fullstack.FlightManagementSystem.Repository.UserRepository;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity; //HttpSecurity: Configure HTTP security rules
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; //EnableWebSecurity: The annotation you just added
import org.springframework.security.config.http.SessionCreationPolicy; //SessionCreationPolicy: Configure how sessions work (we want stateless)
import org.springframework.security.web.SecurityFilterChain; //SecurityFilterChain: The main security configuration
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter; //UsernamePasswordAuthenticationFilter: Built-in Spring filter
import com.fullstack.FlightManagementSystem.Security.JwtAuthenticationFilter; //JwtAuthenticationFilter: Your custom filter

import com.fullstack.FlightManagementSystem.Model.Users;

@Configuration
@EnableWebSecurity // Tells Spring to enable web security features. Activates Spring Security's web security support
@EnableMethodSecurity(prePostEnabled = true)		//Enables @PreAuthorize and @PostAuthorize annotations. Allows method-level security checks
public class SecurityConfig {
	@Autowired
	private UserRepository ur;
	
	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter() {
	    return new JwtAuthenticationFilter();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public UserDetailsService userDetailsService() {
		return email -> {
			Users user = ur.findByEmail(email)
					.orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

			return User.builder().username(user.getEmail()).password(user.getPassword())
					.authorities("ROLE_" + user.getRole().name()).accountExpired(false).accountLocked(false)
					.credentialsExpired(false).disabled(false).build();
		};
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

	    // Step 1: Disable CSRF and configure CORS properly
	    http.csrf(csrf -> csrf.disable())
	        .cors(cors -> cors.configurationSource(request -> {
	            var config = new org.springframework.web.cors.CorsConfiguration();
	            config.setAllowCredentials(true);
	            config.addAllowedOrigin("http://localhost:5173");
	            config.addAllowedHeader("*");
	            config.addAllowedMethod("*");
	            return config;
	        }));

	    // Step 2: Configure URL authorization (new way)
	    http.authorizeHttpRequests(auth -> auth
	            .requestMatchers("/auth/**").permitAll()
	            .requestMatchers("/public/**").permitAll()
	            .anyRequest().authenticated()
	    );

	    // Step 3: Configure session management to be stateless (new way)
	    http.sessionManagement(session -> 
	            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	    );

	    // Step 4: Add our JWT filter before the default authentication filter
	    http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

	    // Step 5: Build and return
	    return http.build();
	}


}
