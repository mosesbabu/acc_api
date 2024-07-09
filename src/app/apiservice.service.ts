import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  private apiUrl = 'https://acc-api.samesoft.app';
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  // Method to retrieve token from API
  getToken(): Observable<any> {
    const loginUrl = `${this.apiUrl}/user/login`;
    const email = 'alix@gmail.com'; 
    const password = '123456'; 
    return this.http.post<any>(loginUrl, { email, password });
  }

  // Method to set token
  setToken(token: string): void {
    this.token = token;
  }

  // Method to fetch data from protected endpoints using the token
  fetchData(endpoint: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${this.apiUrl}/${endpoint}`, { headers });
  }

}

