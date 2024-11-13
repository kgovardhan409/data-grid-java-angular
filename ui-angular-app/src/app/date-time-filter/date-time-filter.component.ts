import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFilterComp, IFilterParams, IDoesFilterPassParams, IAfterGuiAttachedParams } from 'ag-grid-community';


@Component({
  selector: 'app-date-time-filter',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <input type="date" [(ngModel)]="date" />
      <input type="time" [(ngModel)]="time" />
      <button (click)="applyFilter()">Apply</button>
      <button (click)="clearFilter()">Clear</button>
    </div>
  `,
  styles: []
})
export class DateTimeFilterComponent implements IFilterComp {
  // Implementing getGui method
  getGui() {
    const eGui = document.createElement('div');
    eGui.innerHTML = `
      <div>
        <label>Date:</label>
        <input type="date" [(ngModel)]="date" />
        <label>Time:</label>
        <input type="time" [(ngModel)]="time" />
        <button (click)="applyFilter()">Apply</button>
        <button (click)="clearFilter()">Clear</button>
      </div>
    `;
    return eGui;
  }
  
  
  private params!: IFilterParams;
  public date: string = '';
  public time: string = '';

 // Initialize the filter component
 init(params: IFilterParams): void {
  this.params = params;
}

  // This function will be called to filter the data
   // Apply the filter based on selected date and time
   applyFilter() {
    // Format the selected date and time as an ISO string
    const selectedDateTime = this.date && this.time ? `${this.date}T${this.time}:00` : '';
    if (selectedDateTime) {
      // Update the filter model in AG Grid
      this.params.filterChangedCallback();
      this.params.api.onFilterChanged();
    } else {
      // If no date or time is selected, clear the filter
      this.clearFilter();
    }
  }

  // Clear the filter
  clearFilter() {
    this.date = '';
    this.time = '';
    // Notify the grid that the filter has been cleared
    this.params.api.onFilterChanged();
  }

  // Filter logic: check if the row data matches the filter
  doesFilterPass(params: IDoesFilterPassParams): boolean {
    const value = params.data[this.params.colDef.field || 10];
    if (!value) return false;

    const filterDateTime = this.date && this.time ? `${this.date}T${this.time}:00` : '';
    if (!filterDateTime) return true; // If no filter is set, pass all rows

    // Check if the row value matches the filter
    return value === filterDateTime;
  }

  // Check if the filter is active
  isFilterActive(): boolean {
    return !!(this.date && this.time);
  }

  // Get the filter model (used for saving the filter state)
  getModel() {
    return { date: this.date, time: this.time };
  }

  // Set the filter model (used when restoring the filter state)
  setModel(model: any): void {
    this.date = model.date || '';
    this.time = model.time || '';
  }
}