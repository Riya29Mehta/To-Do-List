import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../app/Services/auth.service';

@Injectable({
    providedIn:'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate() {
    return !this.authService.isLoggedIn();
  }
} 