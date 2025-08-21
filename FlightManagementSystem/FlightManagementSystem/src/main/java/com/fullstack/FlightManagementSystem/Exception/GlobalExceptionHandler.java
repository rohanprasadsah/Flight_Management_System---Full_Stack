package com.fullstack.FlightManagementSystem.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.fullstack.FlightManagementSystem.Model.ApiResponse;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(IdNotFoundException.class)
	public ResponseEntity<ApiResponse<String>> HandleIdNotFoundException(IdNotFoundException e){
		ApiResponse<String> api=new ApiResponse<String>(HttpStatus.NOT_FOUND.value(),"Id Not Found",e.getMessage());
		return new ResponseEntity<ApiResponse<String>>(api,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse<String>> HandleResourceNotFoundException(ResourceNotFoundException r){
		ApiResponse<String> api= new ApiResponse<String>(HttpStatus.NOT_FOUND.value(),"Resource Not Found", r.getMessage());
		return new ResponseEntity<ApiResponse<String>>(api, HttpStatus.NOT_FOUND);
	}
}
