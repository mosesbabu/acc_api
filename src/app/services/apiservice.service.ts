import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
  
})

export class ApiserviceService {
  private apiUrl = 'https://acc-api.samesoft.app';
 
  

  constructor(private http: HttpClient) {
   
   }

  
  fetchBalanceSheetData(): Observable<any> {
    const url = `${this.apiUrl}/transaction/balance-sheet`;
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(url, { headers });
  }
   // Method to import transactions from Excel
  importTransactions(transactions: any[]) {
    const apiUrl = `${this.apiUrl}/transaction/import-journal`;
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post(apiUrl, transactions, { headers })
      .subscribe({
        next: response => {
          
          console.log('Successfully imported transactions:', response);
          alert('Transactions imported successfully.');
        },
        error: error => {
          console.error('Error importing transactions:', error);
          alert('Error importing transactions. Please check console for details.');
        }
      });
  }

  // Method to fetch journal statement with running balance

  fetchJournalStatement(from: string, to: string): Observable<any> {
    const url = `${this.apiUrl}/transaction/journal-statement`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { from, to };
    return this.http.post<any>(url, body, { headers });
  }

}

