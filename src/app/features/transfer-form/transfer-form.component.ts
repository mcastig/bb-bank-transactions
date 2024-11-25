import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../core/interfaces/transaction';
import { TransactionsService } from '../../core/services/transactions.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './transfer-form.component.html',
  styleUrl: './transfer-form.component.css'
})

export class TransferFormComponent {
  transactionDate: number = Date.now();
  transactionId: string = this.generateUuid();
  messageModal: string = 'Are you sure you want to make this transfer?';

  transaction: Transaction = {
    id: this.transactionId,
    categoryCode: "#12a580",
    dates: {
      valueDate: this.transactionDate
    },
    transaction: {
      amountCurrency: {
        amount: 0,
        currencyCode: "EUR"
      },
      type: "Online Transfer",
      creditDebitIndicator: "DBIT"
    },
    merchant: {
      name: "",
      logo: "/assets/icons/backbase.png",
      accountNumber: "4692"
    }
  }

  constructor(private transactionsService: TransactionsService, public dialog: MatDialog) {}

  onSubmit(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: this.messageModal,
        name: this.transaction.merchant.name,
        amount: this.transaction.transaction.amountCurrency.amount
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transaction.id = this.generateUuid();
        this.transactionsService.addTransaction(this.transaction).subscribe({
          next: response => {
            console.log('Transaction added:', response);
          },
          error: error => {
            console.error('Error adding transaction:', error);
          }
        });
      }
    });
  }

  private generateUuid(): string {
    return uuidv4();
  }
}
