import { Component } from '@angular/core';
import { HeaderComponent } from "./layout/header/header.component";
import { TransactionsComponent } from "./features/transactions/transactions.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, TransactionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Peachtree Bank';
}
