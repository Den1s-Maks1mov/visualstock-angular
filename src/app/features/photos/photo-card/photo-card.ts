import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photo } from '../../../core/models/photo.interface';

@Component({
  selector: 'app-photo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-card.html',
  styleUrl: './photo-card.css',
})
export class PhotoCard {
  // Чорнетка для статичного відображення
  photoData: Photo = {
    id: '0',
    title: 'Placeholder',
    author: 'N/A',
    url: '',
    views: 0,
    isPremium: false,
    tags: ['initial', 'test'],
    uploadDate: new Date('2024-01-01')
  };
}
