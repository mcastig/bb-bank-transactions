import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  /**
   * Using 'json-server --watch transactions.json' into the folder /app/mock-data/
   * to simulate a api
   */
  private url = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) { }

  /**
   * Fetches transaction data from the JSON file.
   * @returns An Observable that emits an array of Transaction objects.
   */
  getTransactions(): Observable<Transaction[]> {
    /**
     * Makes an HTTP GET request and returns an Observable that emits
     * the data typed as Transaction[].
     */
    return this.http.get<Transaction[]>(this.url);
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.url, transaction);
  }
}
