import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Update with your Node.js server URL

  constructor(private http: HttpClient) {}

  fetchDatabase(): Observable<any> {
    // const url = `${this.apiUrl}/test`; // Update with your Node.js endpoint
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const url =  `${this.apiUrl}/login`;

    return this.http.get(url);
  }
  fetchHello(): Observable<any>{
    const url =  `${this.apiUrl}`;

    return this.http.get(url);

  }
}
