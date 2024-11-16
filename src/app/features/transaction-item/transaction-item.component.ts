import { Component, Input } from '@angular/core';
import { Transaction } from '../../core/interfaces/transaction';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-item',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.css'
})
export class TransactionItemComponent {
  @Input() transaction!: Transaction;
}
