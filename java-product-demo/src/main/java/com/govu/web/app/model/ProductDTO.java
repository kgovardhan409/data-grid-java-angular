package com.govu.web.app.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTO {
	private Long id;
	
	private String name;
	
	private Long quantity;
	
	private Long price;
	
	private LocalDate updatedDate;
}
