import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef, DataTypeDefinition, GridApi, GridReadyEvent, IServerSideDatasource, IServerSideGetRowsParams, ITextFilterParams, RowModelType, ServerSideTransaction, StoreRefreshedEvent } from 'ag-grid-community'; // Column Definition Type Interface
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../service/product.service';
import { Product, ProductResponse } from '../model/product.model';
import { ProductRequest } from '../model/product.model';
import { DEFAULT_PRODUCT_REQUEST } from '../model/constants';
import Swal from 'sweetalert2';
import "ag-grid-enterprise";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AgGridAngular, CustomButtonComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  rowData: Product[] = [];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "name", flex: 2, filter: 'agTextColumnFilter' },
    { field: "quantity", flex: 1, filter: 'agNumberColumnFilter' },
    { field: "price", flex: 1, valueFormatter: p => "₹ " + p.value.toLocaleString(), filter: 'agNumberColumnFilter' },
    { field: "updatedDate", flex: 1, filter: 'agDateColumnFilter'},
    { field: "actions", flex: 1, filter: false, cellRenderer: CustomButtonComponent, onCellClicked: (et) => this.onClickOfButton(et) }
  ];

  public rowModelType: RowModelType = "serverSide";
  public paginationPageSize = 5;
  public cacheBlockSize = 5;
  maxBlocksInCache = 1;
  paginationPageSizeSelector = [5, 10, 20, 30];
  timeout: any;
  searchValue = '';
  fixedRowData: Product[] = [];
  gridApi!: GridApi;
  productResponse: ProductResponse = {
    rowCount: 0,
    rowData: []
  };
  responseRowData: Product[] = [];
  // maxBlocksInCache = 1;

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    floatingFilter: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
    suppressAndOrCondition: true  // Disables 'AND'/'OR' condition selection
  }
  };


  constructor(private router: Router, private productService: ProductService, private http: HttpClient) {

  }

  ngOnInit() { }

  onGridReady(params: GridReadyEvent<Product>) {
    this.gridApi = params.api;
    let productRequest: ProductRequest = DEFAULT_PRODUCT_REQUEST;
    console.log("params ", params);

    var datasource = this.getServerSideDatasource(productRequest);
    // register the datasource with the grid
    params.api!.setGridOption("serverSideDatasource", datasource);
  }

  onClickOfButton(event: any, params?: GridReadyEvent<Product>) {
    let ele: HTMLElement = event.event.target;
    if (ele.innerText === 'Edit') {
      this.router.navigateByUrl('edit-product/' + event.data.id);
    } else if (ele.innerText === 'Delete') {
      let result = window.confirm("Are you sure you want to delete this record ?");
      if (result) {
        this.productService.deleteProduct(event.data.id).subscribe({
          next: () => {
            Swal.fire({
              text: 'Deleted successfully',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            this.gridApi.refreshServerSide({ purge: true });
          },
          error: (error) => {
            console.log(error);
            if (error.error.message == 'Product not found') {
              Swal.fire({
                text: 'Product id doesnt exist',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            } else {
              Swal.fire({
                text: 'Something went wrong, Please try again!',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          }
        });
      }
    }
  }

  add() {
    clearTimeout(3000);
    this.router.navigateByUrl('add-product');
  }

  refreshCache(route?: string[]) {
    const purge = !!(document.querySelector("#purge") as HTMLInputElement).checked;
    this.gridApi.refreshServerSide({ route: route, purge: purge });
    // this.onGridReady(null);
  };

  getServerSideDatasource(productRequest: ProductRequest): IServerSideDatasource {
    return {
      getRows: (params: IServerSideGetRowsParams) => {
        console.log("[Datasource] - rows requested by grid: ", params.request);
        // adding delay to simulate real server call
        setTimeout(() => {
          // call the success callback
          if(params.request.sortModel.length > 0) {
            productRequest.sortBy = params.request.sortModel[0]?.sort;
            productRequest.sortColumn = params.request.sortModel[0]?.colId;
          }
          if(params.request.startRow){
            productRequest.pageNumber = params.request.startRow / 5;
          }
          if(params.request.filterModel){
            console.log(params.request.filterModel)
            productRequest.filters = [];
            Object.entries(params.request.filterModel).forEach(f => {
              console.log(f);
              let searchColumn = f[0];
              let searchBy = f[1].filter ? f[1].filter : new Date(f[1].dateFrom).toLocaleDateString();
              // let searchBy = f[1].filter ? f[1].filter : f[1].dateFrom;
              productRequest.filters.push({
                column: searchColumn,
                value: searchBy
              })
            })
          }
          this.productService.getProductList(productRequest).subscribe(resp => {
              this.responseRowData = [];
              resp.rowData.forEach(product => {
                if (product.updatedDate) {
                  let transformedProd = {
                    ...product,
                    updatedDate: new Date(product.updatedDate).toLocaleDateString('en-GB').replace(/\//g, '-')
                  }
                  this.responseRowData.push(transformedProd);
                }
              });
              console.log(this.responseRowData);
              this.fixedRowData = this.responseRowData;
              this.productResponse.rowData = this.responseRowData;
              this.productResponse.rowCount = resp.rowCount;
              if (this.productResponse.rowData.length > 0) {
                this.gridApi.hideOverlay();
                params.success({
                  rowData: this.productResponse.rowData,
                  rowCount: this.productResponse.rowCount,
                });
              } else {
                this.gridApi.showNoRowsOverlay();
                params.fail();
              }
            },
          () => {
            params.fail();
          });
        }, 200);
      },
    };
  }

}

