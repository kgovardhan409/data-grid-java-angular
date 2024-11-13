package com.govu.web.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.govu.web.app.exception.ProductNotFoundException;
import com.govu.web.app.model.ProductDTO;
import com.govu.web.app.model.ProductGridResponse;
import com.govu.web.app.model.ProductsGridPayload;
import com.govu.web.app.service.ProductService;

@RestController
@CrossOrigin(origins="http://localhost:4200/")
public class ProductCrontroller {

	
	@Autowired
	private ProductService productService;
	
	@PostMapping("/saveProduct")
	public ResponseEntity<ProductDTO> saveProduct(@RequestBody ProductDTO productDTO) throws Exception{
		ProductDTO response = productService.saveProduct(productDTO);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PostMapping("/getProducts")
	public ResponseEntity<ProductGridResponse> getProducts(@RequestBody ProductsGridPayload gridPayload) throws Exception{
		ProductGridResponse response = productService.getProducts(gridPayload);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/getProductById/{productId}")
	public ResponseEntity<ProductDTO> getProductById(@PathVariable() Long productId) throws Exception, ProductNotFoundException{
		ProductDTO response = null;
		try {
			response = productService.getProductById(productId);
		} catch (ProductNotFoundException e) {
			// TODO Auto-generated catch block
			throw new ProductNotFoundException("no products");
		}
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PutMapping("/updateProduct/{productId}")
	public ResponseEntity<ProductDTO> updateProduct(@RequestBody ProductDTO productDTO, @PathVariable Long productId) throws Exception{
		ProductDTO response = productService.updateProduct(productDTO, productId);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteProduct/{productId}")
	public void updateProduct(@PathVariable Long productId) throws Exception, ProductNotFoundException{
		productService.deleteProduct(productId);
	}
}
