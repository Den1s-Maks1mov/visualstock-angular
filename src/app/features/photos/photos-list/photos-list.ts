import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photo } from '../../../core/models/photo.interface';
import {PhotoCard} from '../photo-card/photo-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-photos-list',
  imports: [
    CommonModule,
    PhotoCard,
    FormsModule
  ],
  templateUrl: './photos-list.html',
  styleUrl: './photos-list.css',
})

export class PhotosList {
// Масив mock-даних
  photos: Photo[] = [
    { id: '1', title: 'Mountain lake Vista', author: 'Nikita2504', pImage: 'assets/images/photo-1.jpg', views: 1240, isPremium: false, tags: ['nature', 'landscape'], uploadDate: new Date('2024-06-15') },
    { id: '2', title: 'Minimalist coffee break', author: 'Janet 2389', pImage: 'assets/images/photo-2.jpg', views: 80, isPremium: false, tags: ['food', 'lifestyle'], uploadDate: new Date('2024-07-20') },
    { id: '3', title: 'Neon Cyberpunk City', author: 'Mike Clubnika', pImage: 'assets/images/photo-3.jpg', views: 5200, isPremium: false, tags: ['city', 'neon', 'tech'], uploadDate: new Date('2024-05-10') },
    { id: '4', title: 'High contrast Street Life', author: 'V1ktor1', pImage: 'assets/images/photo-4.jpg', views: 85000, isPremium: true, tags: ['city', 'monochrome', 'street photography', 'architecture'], uploadDate: new Date('2024-04-01') },
  ];

  searchTerm: string = '';

  get filteredPhotos(): Photo[] {
    if (!this.searchTerm) {
      return this.photos;
    }
    const term = this.searchTerm.toLowerCase();

    return this.photos.filter(photo =>
      photo.title.toLowerCase().includes(term) ||
      photo.author.toLowerCase().includes(term)
    );
  };

  handlePhotoSelection(photo: Photo): void {
    console.log(`[EVENT] Обрано фотографію: ${photo.title} (ID: ${photo.id}). Переглядів: ${photo.views}`);
  }
}
