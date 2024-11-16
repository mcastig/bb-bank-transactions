import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../core/services/transactions.service';
import { Transaction } from '../../core/interfaces/transaction';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TransactionItemComponent } from "../transaction-item/transaction-item.component";

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, TransactionItemComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements OnInit {
  // Property to store the transactions.
  transactions: Transaction[] = [];

  // Property to store error messages.
  errorMessage: string | null = null;

  // Inject the service into the constructor.
  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionsService.getData().pipe(
      catchError(error => {
        // Log the error to the console.
        console.error('Error fetching transactions:', error);
        // Set the error message to be displayed.
        this.errorMessage = 'Failed to fetch transactions';
        // Return an empty array as a fallback value.
        return of([]);
        })
    ).subscribe((data: Transaction[]) => {
      // Assign the received data to the transactions property.
      this.transactions = data;
    });
  }
}
