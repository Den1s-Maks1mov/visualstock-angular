import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { finalize } from 'rxjs';

export const passwordMatchValidator = (control: AbstractControl): Validators | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ ...confirmPassword.errors, passwordsNotMatching: true });
    return { passwordsNotMatching: true };
  }

  if (password && confirmPassword && password.value === confirmPassword.value && confirmPassword.hasError('passwordsNotMatching')) {
    const errors = { ...confirmPassword.errors };
    delete errors['passwordsNotMatching'];
    confirmPassword.setErrors(Object.keys(errors).length > 0 ? errors : null);
  }

  return null;
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {

  registerForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  private authService = inject(Auth);
  private router = inject(Router);

  ngOnInit(): void {
    this.registerForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', Validators.required)
      },
      // Застосовуємо синхронний валідатор на рівні FormGroup
      { validators: passwordMatchValidator });

    // Реактивне оновлення валідації для підтвердження пароля
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  onRegisterSubmit(): void {
    this.errorMessage = '';

    if (this.registerForm.valid) {
      this.isLoading = true;
      const { username, email, password } = this.registerForm.value;

      // Виклик методу реєстрації з AuthService
      this.authService.signUp(username, email, password).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: () => {
          // Успішна реєстрація -> перенаправляємо на сторінку авторизації
          alert('Реєстрація успішна! Тепер Ви можете увійти.');
          this.router.navigate(['/login']);
        },
        error: (err: Error) => {
          // Обробка помилок
          this.errorMessage = err.message;
          this.password?.reset();
          this.confirmPassword?.reset();
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
