import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../core/services/transactions.service';
import { Transaction } from '../../core/interfaces/transaction';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
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
