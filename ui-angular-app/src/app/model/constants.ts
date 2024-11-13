import { ProductRequest } from "./product.model";


export const DEFAULT_PRODUCT_REQUEST: ProductRequest = {
    "pageNumber": 0,
    "pageSize": 5,
    "sortBy": "DESC",
    "sortColumn": "name",
    "filters": []
}