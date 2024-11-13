import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductResponse } from '../model/product.model';
import { ProductRequest } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  getProductList(productRequest: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>('http://localhost:8080/getProducts', productRequest);
  }

  deleteProduct(id: number): Observable<any>{
    return this.http.delete('http://localhost:8080/deleteProduct/'+id);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<any>('http://localhost:8080/getProductById/'+id);
  }

  saveProduct(product: Product): Observable<any>{
    return this.http.post<any>('http://localhost:8080/saveProduct', product);
  }

  updateProduct(product: Product): Observable<Product>{
    return this.http.put<Product>('http://localhost:8080/updateProduct/'+product.id, product);
  }
}
