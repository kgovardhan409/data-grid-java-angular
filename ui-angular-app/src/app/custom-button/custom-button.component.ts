import { ICellRendererAngularComp } from 'ag-grid-angular';;
import { ICellRendererParams } from 'ag-grid-community';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    template: `<button class="editBtn btn btn-primary">Edit</button> <button class="deleteBtn btn btn-danger">Delete</button>`,
    styles: `.deleteBtn, .editBtn{ padding: 2px 10px; margin:5px;font-size: 16px;border: 1px solid grey; border-radius: 5px;margin-right: 15px}`
})
export class CustomButtonComponent implements ICellRendererAngularComp {
    agInit(params: ICellRendererParams): void {
      // console.log(params)
      // console.log(params.value)
    }
    refresh(params: ICellRendererParams) {
      // console.log(params)
        return true;
    }
    buttonClicked(e:any) {
        // console.log(e.target);
    }
}