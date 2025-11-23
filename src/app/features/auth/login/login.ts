import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  loginForm!: FormGroup;
  loginFailed: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false; // Прапорець завантаження для кнопки

  private authService = inject(Auth);
  private router = inject(Router);

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(): void {
    this.loginFailed = false;
    this.errorMessage = '';

    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.authService.signIn(email, password).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: () => {
          this.router.navigate(['/photos']);
        },
        error: (err: Error) => {
          this.loginFailed = true;
          this.errorMessage = err.message;
          this.loginForm.get('password')?.reset();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
