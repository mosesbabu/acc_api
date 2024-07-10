import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = ''; 
  password: string = ''; 
  errorMessage: string | null = null;

  
  constructor(private authService: AuthService, private router: Router)  {}

  onLogin() {
    this.errorMessage = ''; 
    this.authService.login(this.email, this.password).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.router.navigate(['/balance-sheet']);
        }
         else {
          this.errorMessage = 'Invalid email or password. Please try again.';
         }
          },
      error: (error:Error) => {
        this.errorMessage = 'Login failed: ' + (error.message || 'Unknown error');
        console.error('Login error', error);
      }
    });
  }
}
