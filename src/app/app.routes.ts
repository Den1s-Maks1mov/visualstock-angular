import { Routes } from '@angular/router';
import { PhotosList } from './features/photos/photos-list/photos-list';

export const routes: Routes = [
  { path: 'photos', component: PhotosList }, // Основний маршрут
  { path: '', redirectTo: '/photos', pathMatch: 'full' }, // Маршрут за замовчуванням
];
