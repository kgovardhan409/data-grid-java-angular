package com.govu.web.app.model;

import java.security.Timestamp;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
	private String message;
	private int statusCode;
	private LocalDateTime timeStamp;
}
