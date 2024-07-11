// alert.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private http:HttpClient){}
  // shows alert if seession expires
  showExpiredSessionAlert(): void {
    alert('Your session has expired. Please log in again.');
  }

  
}
