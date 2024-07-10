import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'

})
export class LoginComponent {
  email: string = environment.defaultEmail;
  password: string = environment.defaultPassword; 
  isLoading: boolean = false;
  errorMessage: string | null = null;
  message: string = '';
  
  constructor(private authService: AuthService, private router: Router)  {}

  onLogin() {
    this.errorMessage = '';
    this.isLoading = true;
    this.message = 'Logging in...'; 
    this.authService.login(this.email, this.password).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.isLoading = false;
          this.message = 'Login successful!'
          this.router.navigate(['/balance-sheet']);
        }
         else {
          this.message = 'Login failed. Please try again.';
         } 
        },
        error: (error) => {
          this.isLoading = false;
          this.message = 'Login failed. Please try again.';
          console.error('Error logging in:', error);
        }
    });
  }
}
