import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full'
    },
    {
        path: 'products',
        component: ProductListComponent
    },
    {
        path: 'edit-product/:id',
        component: AddEditProductComponent
    },
    {
        path: 'add-product',
        component: AddEditProductComponent
    }
];
