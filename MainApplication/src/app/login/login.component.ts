//login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ApiService } from '../Services/login.service';
import { AuthService } from '../Services/auth.service';
import { SessionService } from '../Services/Session.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginFailed = false;
  

  constructor(private loginService: ApiService, private router: Router, private authService: AuthService, private sessionService:SessionService, private cookie: CookieService) {
    console.log("login component")
   }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(){
    if(this.authService.isLoggedIn()){
        this.router.navigate(['/admin'])
    }
  }

  onSubmit(): void {
    const sessionId = this.cookie.get('sessionId')
    if(sessionId){
      alert("you are already logged in!!")
      this.router.navigate(['login'])
    }
    else{
    const { email, password } = this.loginForm.value;
    
    // authentcating the user
    this.authService.login(email, password).subscribe({ 
      next:(response: any) => {
        if (response.success) {
          console.log(response);
          this.authService.isAuthenticated=true;
          console.log('session Set',this.cookie.get('sessionId'))
          this.router.navigate(['admin'])
        } else {
          console.log('Login failed:', response.message);
          this.loginFailed=true;
          // Handle failed login
        }
      },
      error:(error) => {
        console.error('Login error:', error);
        // Handle error
      }
    
    });
    }

    }}

  


