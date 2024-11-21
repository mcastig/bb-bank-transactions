import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sort-by',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sort-by.component.html',
  styleUrl: './sort-by.component.css'
})
export class SortByComponent {
  sortColumn: string = 'date';
  sortDirection: string = 'desc';

  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortArray();
  }

  sortArray(): void {
    console.log(`Sorting by ${this.sortColumn} in ${this.sortDirection} order`);
  }
}
