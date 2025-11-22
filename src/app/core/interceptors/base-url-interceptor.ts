import { HttpInterceptorFn } from '@angular/common/http';

// Базовий URL Firebase
const BASE_URL = 'https://visualstock-2025-default-rtdb.firebaseio.com/';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {

  // Перевірка, чи запит вже не є зовнішнім
  if (req.url.startsWith('http')) {
    return next(req);
  }

  // Клонування запиту, щоб змінити його URL
  const clonedRequest = req.clone({
    url: `${BASE_URL}${req.url}`
  });

  // Передача модифікованого запиту далі по ланцюгу
  return next(clonedRequest);
};
