package com.govu.web.app.service;

import java.util.List;

import com.govu.web.app.exception.ProductNotFoundException;
import com.govu.web.app.model.ProductDTO;
import com.govu.web.app.model.ProductGridResponse;
import com.govu.web.app.model.ProductsGridPayload;

public interface ProductService {

	ProductDTO saveProduct(ProductDTO productDTO) throws Exception;
	
	ProductGridResponse getProducts(ProductsGridPayload gridPayload);

	ProductDTO updateProduct(ProductDTO productDTO, Long productId) throws Exception;

	void deleteProduct(Long productId) throws Exception, ProductNotFoundException;

	ProductDTO getProductById(Long productId) throws ProductNotFoundException;

}
