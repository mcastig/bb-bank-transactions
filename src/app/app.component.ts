import { Component } from '@angular/core';
import { HeaderComponent } from "./layout/header/header.component";
import { TransactionListComponent } from "./features/transaction-list/transaction-list.component";
import { TransferFormComponent } from "./features/transfer-form/transfer-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, TransactionListComponent, TransferFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Peachtree Bank';
}
