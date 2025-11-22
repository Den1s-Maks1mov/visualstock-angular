import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PhotoData } from '../../../core/services/photo-data';
import { Photo } from '../../../core/models/photo.interface';
import {Observable, switchMap} from 'rxjs';

@Component({
  selector: 'app-photo-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './photo-details.html',
  styleUrl: './photo-details.css',
})
export class PhotoDetails {
  photo$!: Observable<Photo | undefined>;
  photoId!: string;

  constructor(
    private route: ActivatedRoute,
    private photoDataService: PhotoData
  ) {}

  ngOnInit(): void {
    // 1. Підписуємось на зміни параметрів маршруту
    this.photo$ = this.route.paramMap.pipe(
      // 2. Витягуємо ID та перемикаємо потік на HTTP-запит
      switchMap(params => {
        const photoId = params.get('id');
        if (photoId) {
          // Викликаємо оновлений сервісний метод
          return this.photoDataService.getPhotoById(photoId);
        }
        return new Observable<undefined>(); // Повертаємо порожній Observable, якщо ID відсутній
      })
    );
  }
}
