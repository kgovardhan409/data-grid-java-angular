import { DatePipe } from "@angular/common";

export interface Product {
    id?: number;
    name: string;
    quantity: number;
    price: number;
    updatedDate?: string
}

export interface ProductRequest {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortColumn: string,
    filters: Filters[]
}

export interface ProductResponse {
    rowData: Product[];
    rowCount: number;
}

export interface Filters {
    column: string;
    value: any
}