import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Transaction } from '../../core/interfaces/transaction';
import { TransactionsService } from '../../core/services/transactions.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './transfer-form.component.html',
  styleUrl: './transfer-form.component.css'
})
export class TransferFormComponent implements OnInit {
  transferForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transactionsService: TransactionsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      name: ['', Validators.required],
      categoryCode: ['#12a580'],
      valueDate: [Date.now()],
      type: ['Online Transfer'],
      creditDebitIndicator: ['DBIT'],
      accountNumber: ['4692']
    });
  }

  onSubmit(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to make this transfer?',
        name: this.transferForm.value.name,
        amount: this.transferForm.value.amount
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newTransaction: Transaction = {
          id: uuidv4(),
          categoryCode: this.transferForm.value.categoryCode,
          dates: {
            valueDate: this.transferForm.value.valueDate
          },
          transaction: {
            amountCurrency: {
              amount: this.transferForm.value.amount,
              currencyCode: 'EUR'
            },
            type: this.transferForm.value.type,
            creditDebitIndicator: this.transferForm.value.creditDebitIndicator
          },
          merchant: {
            name: this.transferForm.value.name,
            logo: '/assets/icons/backbase.png',
            accountNumber: this.transferForm.value.accountNumber
          }
        };

        this.transactionsService.addTransaction(newTransaction).subscribe({
          next: response => {
            console.log('Transaction added:', response);
            this.transferForm.reset();
            this.transferForm.patchValue({
              categoryCode: '#12a580',
              valueDate: Date.now(),
              type: 'Online Transfer',
              creditDebitIndicator: 'DBIT',
              accountNumber: '4692'
            });
          },
          error: error => {
            console.error('Error adding transaction:', error);
          }
        });
      }
    });
  }
}
