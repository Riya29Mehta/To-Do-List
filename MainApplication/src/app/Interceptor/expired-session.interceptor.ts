// expired-session.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../Services/alert.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ExpiredSessionInterceptor implements HttpInterceptor {
    constructor(private alertService: AlertService, private router: Router, private http:HttpClient, private cookieService: CookieService) { }

    //checks if session is expired
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error) => {
                if (error.status === 401) {
                    //if user is logged out, does not permit to perform crud opr.
                    this.alertService.showExpiredSessionAlert();
                    this.cookieService.deleteAll()
                    this.router.navigate(['/login']);

                }
                return throwError(error);
            })
        );
    }
}
//sequence = next.handle(request) --> pipe(...) ---> catchError(...)