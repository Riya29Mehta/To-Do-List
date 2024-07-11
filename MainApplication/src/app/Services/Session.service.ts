// session.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
    private isSessionAct:boolean = false;
  constructor(private http: HttpClient) {}

  checkSession(): Observable<{ isActive: boolean }> {
    return this.http.get<{ isActive: boolean }>('/check-session');
  }

  setSessionStatus(status: boolean): void {
    this.isSessionAct = status;
  }

  isSessionActive(): boolean {
    return this.isSessionAct;
  }
}
