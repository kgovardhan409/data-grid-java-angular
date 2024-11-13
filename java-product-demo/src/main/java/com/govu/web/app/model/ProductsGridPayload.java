package com.govu.web.app.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductsGridPayload {
	private Integer pageNumber;
	private Integer pageSize;
	private String sortBy;
	private String sortColumn;
	private List<Filter> filters;
}
