import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const token = authService.getAccessToken();

  if (token) {

    const authParams = new HttpParams().set('auth', token);

    const clonedRequest = req.clone({
      params: authParams
    });

    return next(clonedRequest);
  }

  return next(req);
};
