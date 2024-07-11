//auth.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  private apiUrl = 'http://localhost:3000';
  private username: string = "";
  private password: string = '';

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  // hit login api in backend, to authenticate the user
  login(username: any, password: any): Observable<any> {
    this.username = username
    this.password = password

    const url = `${this.apiUrl}/loginUser`
    return this.http.post(url, { username, password }, { withCredentials: true });

  }

  //checks if user is logged in or not
  isLoggedIn(): boolean {
    const sessionId = this.cookieService.get('sessionId')

    console.log("sessionId", sessionId);
    if (sessionId) {
      return true;
    } else {
      return false;
    }

  }

  // hit signup api at backend
  signup(username: any, password: any, newpassword: any): Observable<any> {
    const url = `${this.apiUrl}/signupUser`
    return this.http.post(url, { username, password });
  }

  getUsername() {
    return this.username
  }

  logout(): Observable<any> {
    const url = `${this.apiUrl}/logout`
    return this.http.get(url, { withCredentials: true });
  }

  isSessionActive(): Observable<any> {
    const url = `${this.apiUrl}/check-session`;
    console.log("session active")
    return this.http.get(url, { withCredentials: true });

  }

}
