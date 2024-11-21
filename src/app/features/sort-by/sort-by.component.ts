import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort-by',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sort-by.component.html',
  styleUrl: './sort-by.component.css'
})
export class SortByComponent {
  // The currently selected column for sorting.
  sortColumn: string = 'dates.valueDate';

  // The current direction of sorting, either 'asc' or 'desc'.
  sortDirection: string = 'desc';

  // Event emitter to notify the parent component about the sorting change.
  @Output() sortEvent = new EventEmitter<{ column: string, direction: string }>();

  /**
   * Toggles the sorting direction or changes the sorting column.
   * If the same column is clicked, it toggles the direction between 'asc' and 'desc'.
   * If a different column is clicked, it sets the direction to 'asc' for the new column.
   *
   * @param column - The column to sort by.
   */
  sortData(column: string): void {
    if (this.sortColumn === column) {
      // Toggle the sorting direction if the same column is clicked.
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set the new column and reset the direction to 'asc'.
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    // Emit the sorting event to notify the parent component.
    this.emitSortEvent();
  }

  /**
   * Emits the sortEvent with the current sorting column and direction.
   * This allows the parent component to update its sorted data accordingly.
   */
  emitSortEvent(): void {
    this.sortEvent.emit({ column: this.sortColumn, direction: this.sortDirection });
  }
}
