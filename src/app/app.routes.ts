import { Routes } from '@angular/router';
import { PhotosList } from './features/photos/photos-list/photos-list';
import { PhotoDetails } from './features/photos/photo-details/photo-details';

export const routes: Routes = [
  { path: 'photos', component: PhotosList }, // Основний маршрут
  { path: 'photos/:id', component: PhotoDetails }, // Динамічний маршрут для деталей фотографії
  { path: '', redirectTo: '/photos', pathMatch: 'full' }, // Маршрут за замовчуванням
];
