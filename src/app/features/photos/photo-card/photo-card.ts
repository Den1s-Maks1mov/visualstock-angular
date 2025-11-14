import { Component } from '@angular/core';
import { Photo } from '../../../core/models/photo.interface';

@Component({
  selector: 'app-photo-card',
  standalone: true,
  imports: [],
  templateUrl: './photo-card.html',
  styleUrl: './photo-card.css',
})
export class PhotoCard {
  // Чорнетка для статичного відображення
  photoData: Photo = {
    id: '1',
    title: 'Mountain lake Vista',
    author: 'Nikita2504',
    pImage: "assets/images/photo-1.jpg",
    views: 1240,
    isPremium: false,
    tags: ['nature', 'landscape'],
    uploadDate: new Date('2024-06-15')
  };
}
