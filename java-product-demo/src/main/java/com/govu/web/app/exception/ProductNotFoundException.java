package com.govu.web.app.exception;

import lombok.Data;

@Data
public class ProductNotFoundException extends Throwable{
	
private String message;

//	private String message;
	
	public ProductNotFoundException(String message) {
		super(message);
		this.message = message;
	}
	
}
