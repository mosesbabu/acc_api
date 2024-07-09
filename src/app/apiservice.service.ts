import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
  
})

export class ApiserviceService {
  private apiUrl = 'https://acc-api.samesoft.app';
  private tokenKey = 'auth_token';
  private token: string | null = null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem(this.tokenKey);
   }

  // Method to retrieve token from API
  getToken(): Observable<any> {
    const loginUrl = `${this.apiUrl}/user/login`;
    const email = 'alix@gmail.com';
    const password = '123456';
  
    return this.http.post<any>(loginUrl, { email, password }).pipe(
      tap((response) => {
        this.setToken(response.token);
        console.log('Token saved:', this.token);
      })
    );
  }

  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem(this.tokenKey, token);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
  
  fetchBalanceSheetData(): Observable<any> {
    
    const url = `${this.apiUrl}/transaction/balance-sheet`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(url, { headers });
  }
   // Method to import transactions from Excel
   importTransactions(transactions: any[]): Observable<any> {
    const url = `${this.apiUrl}/transaction/import-journal`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<any>(url, transactions, { headers });
  }

  // Method to fetch journal statement with running balance
  fetchJournalStatement(from: string, to: string): Observable<any> {
    const url = `${this.apiUrl}/transaction/journal-statement`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const body = { from, to };
    return this.http.post<any>(url, body, { headers });
  }
}

