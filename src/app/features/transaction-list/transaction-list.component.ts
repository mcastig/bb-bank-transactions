import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../core/services/transactions.service';
import { Transaction } from '../../core/interfaces/transaction';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TransactionItemComponent } from "../transaction-item/transaction-item.component";
import { SearchByComponent } from "../search-by/search-by.component";
import { SortByComponent } from '../sort-by/sort-by.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, TransactionItemComponent, SearchByComponent, SortByComponent],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'] // Ensure this is 'styleUrls' (plural)
})
export class TransactionListComponent implements OnInit {
  // Array to store all transactions fetched from the service.
  transactions: Transaction[] = [];

  // Array to store transactions after applying filters or sorting.
  filteredTransactions: Transaction[] = [];

  // Property to store any error messages that might occur during data fetching.
  errorMessage: string | null = null;

  // Inject the TransactionsService into the component.
  constructor(private transactionsService: TransactionsService) {}

  /**
   * Lifecycle hook to fetch data when the component initializes.
   * Calls the service to fetch transaction data, handles errors if any,
   * and initializes the transactions and filteredTransactions arrays.
   */
  ngOnInit(): void {
    this.transactionsService.getTransactions().pipe(
      catchError(error => {
        // Log the error to the console for debugging purposes.
        console.error('Error fetching transactions:', error);

        // Set a user-friendly error message.
        this.errorMessage = 'Failed to fetch transactions';

        // Return an observable with an empty array as a fallback.
        return of([]);
      })
    ).subscribe((data: Transaction[]) => {
      // Store the fetched transactions.
      this.transactions = data;

      // Initially, set filteredTransactions to be the same as transactions.
      this.filteredTransactions = this.transactions;
    });
  }

  /**
   * Filters transactions based on the provided search text.
   * If the search text is empty, it resets the filtered transactions to the full list.
   * Otherwise, it filters the transactions to include only those where the merchant name
   * includes the search text (case insensitive).
   *
   * @param text - The search text to filter transactions by.
   */
  getFilterSearch(text: string): void {
    // If there's no search text, reset filteredTransactions to show all transactions.
    if (!text) {
      this.filteredTransactions = this.transactions;
      return;
    }

    // Filter the transactions where the merchant's name includes the search text.
    this.filteredTransactions = this.transactions.filter(term =>
      term.merchant.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
  }

  /**
   * Sorts the filtered transactions based on the provided column and direction.
   * Utilizes the getValue method to handle nested properties for sorting.
   *
   * @param event - An object containing the column to sort by and the direction (asc/desc).
   */
  sortTransactions(event: { column: string, direction: string }): void {
    const { column, direction } = event;

    // Sort the filtered transactions based on the provided column and direction.
    this.filteredTransactions.sort((a, b) => {
      let comparison = 0;
      const valueA = this.getValue(a, column);
      const valueB = this.getValue(b, column);

      if (valueA > valueB) {
        comparison = 1;
      } else if (valueA < valueB) {
        comparison = -1;
      }

      // Return comparison based on direction.
      return direction === 'asc' ? comparison : -comparison;
    });
  }

  /**
   * Helper method to retrieve a nested value from an object using a string key.
   * This method splits the key by '.' to access nested properties.
   *
   * @param obj - The object to retrieve the value from.
   * @param key - The key representing the nested property (e.g., 'merchant.name').
   * @returns The value of the nested property or undefined if not found.
   */
  private getValue(obj: any, key: string): any {
    return key.split('.').reduce((o, k) => (o || {})[k], obj);
  }
}
