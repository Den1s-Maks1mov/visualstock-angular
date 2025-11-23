import { Routes } from '@angular/router';
import { PhotosList } from './features/photos/photos-list/photos-list';
import { PhotoDetails } from './features/photos/photo-details/photo-details';
import { PhotoForm } from './features/photos/photo-form/photo-form';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login }, // Маршрут авторизації
  { path: 'register', component: Register}, // Маршрут реєстрації
  { path: 'photos', component: PhotosList }, // Основний маршрут
  { path: 'photos/add', component: PhotoForm, canActivate: [authGuard] }, // Захищений маршрут додавання фотографій
  { path: 'photos/:id', component: PhotoDetails }, // Динамічний маршрут для деталей фотографії
  { path: '', redirectTo: '/photos', pathMatch: 'full' }, // Маршрут за замовчуванням
];
