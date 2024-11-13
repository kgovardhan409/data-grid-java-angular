import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router, RouterConfigurationFeature, RouterLink } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
// import { Router } from 'express';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnInit {

  product: Product = {
    name: '',
    quantity: NaN,
    price: NaN
  };
  isEdit: boolean = false;

  constructor
  (private activatedRoute: ActivatedRoute, 
    private productService: ProductService,
    private router: Router
  ){

  }

  ngOnInit(){
    let productId = this.activatedRoute.snapshot.paramMap.get('id');
    if(productId){
      this.isEdit = true;
      this.productService.getProductById(Number(productId)).subscribe(resp => {
        this.product = resp;
      })
    }
  }

  submitForm(){
    if(this.product.name && this.product.price && this.product.quantity){
      if(!this.isEdit){
        this.productService.saveProduct(this.product).subscribe( () => {
          Swal.fire({
            text: 'Saved successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.router.navigateByUrl("/products");
          },
          (error: Error) => {
            console.log(error);
            Swal.fire({
              text: 'Something went wrong, Please try again!',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        )
      } else {
        this.productService.updateProduct(this.product).subscribe( () => {
          Swal.fire({
            text: 'Updated successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.router.navigateByUrl("/products");
          },
          (error: Error) => {
            console.log(error);
            Swal.fire({
              text: 'Something went wrong, Please try again!',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        )
      }
    }
  }
}
