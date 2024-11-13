package com.govu.web.app.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.function.Predicate;

import org.springframework.data.jpa.domain.Specification;

import com.govu.web.app.entity.Product;

import jakarta.persistence.criteria.Path;

public class ProductSpecification {
	
	public static Specification<Product> hasName(String name){
		return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("name"), "%" + name + "%");
	}

	public static Specification<Product> equalsPrice(String value) {
		 return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("price"), value);
	}

	public static Specification<Product> equalsQuantity(String value) {
		return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("quantity"), value);
	}

	public static Specification<Product> equalsDate(String value) {
		return (root, query, criteriaBuilder) -> {
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
			LocalDate parsedDate = LocalDate.parse(value, formatter);
			Path<LocalDateTime> datePath = root.get("updatedDate");
			return criteriaBuilder.equal(datePath, parsedDate);
		};
	}

}
