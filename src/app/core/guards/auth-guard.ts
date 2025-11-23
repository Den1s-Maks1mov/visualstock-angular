import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const authService = inject(Auth);

  const router = inject(Router);

  const isAuthenticated = authService.getAuthStatus();

  if (isAuthenticated) {
    return true;
  } else {
    alert('Для додавання фотографій необхідно авторизуватися.');
    return router.createUrlTree(['/login']);
  }
};
