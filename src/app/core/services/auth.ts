import { Injectable, inject } from '@angular/core';
import {BehaviorSubject, Observable, throwError, tap, catchError} from 'rxjs';
import { Router } from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { AuthResponseModel } from '../models/auth-response.model';

const FIREBASE_API_KEY = 'AIzaSyACKW-gD2gql7vZTpN7uPb1GFE96IH3SPc';

@Injectable({ providedIn: 'root' })
export class Auth {

  private readonly TOKEN_KEY = 'vs_access_token';
  private readonly USERNAME_KEY = 'nikita2504@gmail.com';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  private userLoginSubject = new BehaviorSubject<string | null>(this.getStoredUsername());
  public userLogin$: Observable<string | null> = this.userLoginSubject.asObservable();

  private router = inject(Router);
  private http = inject(HttpClient);

  constructor() { }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private getStoredUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  private extractUsernameFromEmail(email: string): string {
    return email.split('@')[0];
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Виникла невідома помилка!';

    if (error.error && error.error.error) {
      errorMessage = error.error.error.message;

      switch (errorMessage) {
        case 'EMAIL_EXISTS':
          errorMessage = 'Користувач із цією поштою вже зареєстрований.';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMessage = 'Невірний логін або пароль.';
          break;
        default:
          errorMessage = `Помилка сервера: ${error.status}. ${error.error.error.message}`;
      }
    } else {
      errorMessage = `Помилка мережі: ${error.message}`;
    }

    console.error('FIREBASE AUTH ERROR:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private handleAuthentication(res: AuthResponseModel, username: string): void {
    localStorage.setItem(this.TOKEN_KEY, res.idToken);
    localStorage.setItem(this.USERNAME_KEY, username);
    this.isAuthenticatedSubject.next(true);
    this.userLoginSubject.next(username);
  }

  signIn(email: string, password: string): Observable<AuthResponseModel> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    const userData = { email, password, returnSecureToken: true };

    return this.http.post<AuthResponseModel>(url, userData).pipe(
      tap(res => {
        const username = this.extractUsernameFromEmail(res.email);
        this.handleAuthentication(res, username);
      }),
      catchError(this.handleError)
    );
  }

  signUp(username: string, email: string, password: string): Observable<AuthResponseModel> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
    const userData = { email, password, returnSecureToken: true };

    return this.http.post<AuthResponseModel>(url, userData).pipe(
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
    this.isAuthenticatedSubject.next(false);
    this.userLoginSubject.next(null);
    this.router.navigate(['/photos']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getAuthStatus(): boolean {
    return this.isAuthenticatedSubject.getValue();
  }
}
