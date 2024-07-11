import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router) {
      console.log('signup component')
   }
  signupForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')])),
    confirmPassword: new FormControl('', Validators.required)
  })
  onSubmit(): void {
    const { email, password, confirmPassword } = this.signupForm.value;
    if (password !== confirmPassword) {
      alert("password and confirm password does not match")
    }

    else {
      this.authService.signup(email, password, confirmPassword).subscribe({
        next:(response: any) => {
          if (response.success) {
            console.log('Regis successful');
            alert("registered successfully")
           
            this.router.navigate(['/login'])
          } else {
            console.log('Regis failed:', response.message);
            // Handle failed login
          }
        },
        error:(error) => {
          console.error('Regis error:', error);
          // Handle error
        }
    });
    }
  }
}
