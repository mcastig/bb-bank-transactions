import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  public transactions$ = this.transactionsSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Fetches transaction data from the JSON file.
   * @returns An Observable that emits an array of Transaction objects.
   */
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url).pipe(
      tap(transactions => this.transactionsSubject.next(transactions))
    );
  }

  addTransaction(transaction: Transaction): Observable<any> {
    return this.http.post(this.url, transaction).pipe(
      tap(() => {
        const currentTransactions = this.transactionsSubject.value;
        this.transactionsSubject.next([transaction, ...currentTransactions]);
      })
    );
  }
}
