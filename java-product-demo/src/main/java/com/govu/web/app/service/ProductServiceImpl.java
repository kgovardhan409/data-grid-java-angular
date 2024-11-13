package com.govu.web.app.service;

import java.awt.print.Pageable;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.govu.web.app.entity.Product;
import com.govu.web.app.exception.ProductNotFoundException;
import com.govu.web.app.model.Filter;
import com.govu.web.app.model.ProductDTO;
import com.govu.web.app.model.ProductGridResponse;
import com.govu.web.app.model.ProductsGridPayload;
import com.govu.web.app.repository.ProductRepository;
import com.govu.web.app.util.ProductSpecification;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private ProductRepository productRepository;

	@Override
	public ProductDTO saveProduct(ProductDTO productDTO) throws Exception {
		try {
			Product product = Product.builder()
					.name(productDTO.getName())
					.quantity(productDTO.getQuantity())
					.price(productDTO.getPrice())
					.updatedDate(productDTO.getUpdatedDate())
					.build();
			
			Product response = productRepository.save(product);
			productDTO.setId(response.getId());
			return productDTO;
		} catch(Exception e) {
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public ProductGridResponse getProducts(ProductsGridPayload gridPayload) {
		Sort sort = gridPayload.getSortBy().equalsIgnoreCase("DESC") ? Sort.by(gridPayload.getSortColumn()).descending() : Sort.by(gridPayload.getSortColumn()).ascending();
		PageRequest pageable = PageRequest.of(gridPayload.getPageNumber(), gridPayload.getPageSize(), sort);
		
		Specification<Product> spec = Specification.where(null);
		
		if(gridPayload.getFilters().size() > 0) {
		
			for(Filter filter : gridPayload.getFilters()) {
				if(filter.getColumn().equals("name") && !filter.getValue().isEmpty()) {
					spec = spec.and(ProductSpecification.hasName(filter.getValue()));
				} 
				else if (filter.getColumn().equals("price") && !filter.getValue().isEmpty()) {
					spec = spec.and(ProductSpecification.equalsPrice(filter.getValue()));
				}
				else if (filter.getColumn().equals("quantity") && !filter.getValue().isEmpty()) {
					spec = spec.and(ProductSpecification.equalsQuantity(filter.getValue()));
				}
				else if (filter.getColumn().equals("updatedDate") && !filter.getValue().isEmpty()) {
					spec = spec.and(ProductSpecification.equalsDate(filter.getValue()));
				}
			}
		}
		
		Page<Product> productList = productRepository.findAll(spec, pageable);
//		totalCount
		
		List<ProductDTO> rowData = productList.stream()
				.map(p -> ProductDTO.builder()
						.name(p.getName())
						.id(p.getId())
						.quantity(p.getQuantity())
						.price(p.getPrice())
						.updatedDate(p.getUpdatedDate())
						.build())
						.toList();
		
		return new ProductGridResponse(productList.getTotalElements(), rowData);
	}

	@Override
	public ProductDTO updateProduct(ProductDTO productDTO, Long productId) throws Exception {
		try {
			
			Product product = productRepository.findById(productId).orElseThrow();
			
			product.setName(productDTO.getName());
			product.setQuantity(productDTO.getQuantity());
			product.setPrice(productDTO.getPrice());
			product.setUpdatedDate(productDTO.getUpdatedDate());
			
			Product p = productRepository.save(product);
			return ProductDTO.builder()
					.name(p.getName())
					.id(p.getId())
					.quantity(p.getQuantity())
					.price(p.getPrice())
					.updatedDate(p.getUpdatedDate())
					.build();
		} catch(Exception e) {
			throw new Exception();
		}
	}

	@Override
	public void deleteProduct(Long productId) throws Exception, ProductNotFoundException {
		Product product = productRepository.findById(productId).orElse(null);
		if(product != null) {
			productRepository.deleteById(productId);
		} else {
			throw new ProductNotFoundException("Product not found");
		}
	}

	@Override
	public ProductDTO getProductById(Long productId) throws ProductNotFoundException {
		Product product = productRepository.findById(productId).orElseThrow(() -> new ProductNotFoundException("product not found"));
		
		return ProductDTO.builder()
						.name(product.getName())
						.id(product.getId())
						.quantity(product.getQuantity())
						.price(product.getPrice())
						.updatedDate(product.getUpdatedDate())
						.build();
	}
	
	

}
