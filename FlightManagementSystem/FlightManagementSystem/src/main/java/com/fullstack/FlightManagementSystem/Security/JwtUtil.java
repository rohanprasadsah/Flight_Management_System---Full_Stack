//🔐 Security Notes:
//•  JWT tokens are stateless - server doesn't store them
//•  Secret key should be long and random in production
//•  Always verify token signature and expiration


package com.fullstack.FlightManagementSystem.Security;

import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtUtil {
	@Value("${jwt.secret:mySecretKey}")
	private String jwtSecret;
	@Value("${jwt.expiration:86400000}") //(24 hours in milliseconds)
	private int jwtExpirationMs;
	
	private SecretKey generateSecretKey() {
		return Keys.hmacShaKeyFor(jwtSecret.getBytes()); //to create a secure key
	}
	
	public String generateToken(String email) {
		Map<String, Object> claims=new HashMap<String, Object>();
		return Jwts.builder()
				.claims(claims)
				.subject(email)
				.issuedAt(Date.from(Instant.now()))
				.expiration(Date.from(Instant.now().plusMillis(jwtExpirationMs)))
				.signWith(generateSecretKey())
				.compact();
	}
	
	public String extractEmail(String token) {
	    return Jwts.parser()  // create JWT parser
	            .verifyWith(generateSecretKey()) // verify with the same secret key
	            .build()
	            .parseSignedClaims(token) // parse and validate token
	            .getPayload()
	            .getSubject(); // extract subject (email)
	}
	
	public Date extractExpiration(String token){
		return Jwts.parser()
				.verifyWith(generateSecretKey())
				.build()
				.parseSignedClaims(token)
				.getPayload()
				.getExpiration();
	}
	
	public boolean isTokenExpired(String token){
		return extractExpiration(token).before(new Date());
//		if(extractExpiration(token).before(new Date())) {
//			return true;
//		}else {
//			return false;
//		}
	}
	
	public boolean validateToken(String token, String email){
		return extractEmail(token).equals(email)&&!isTokenExpired(token);
	}
}












