package com.govu.web.app.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.govu.web.app.model.ErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(value = ProductNotFoundException.class)
	public ResponseEntity<ErrorResponse> productNotFound(ProductNotFoundException productNotFound){
		ErrorResponse errorResponse = new ErrorResponse(productNotFound.getMessage(), HttpStatus.NOT_FOUND.value(), LocalDateTime.now());
		return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.NOT_FOUND);
	}
}
