import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photo } from '../../../core/models/photo.interface';
import {PhotoCard} from '../photo-card/photo-card';
import { FormsModule } from '@angular/forms';
import { PhotoData } from '../../../core/services/photo-data';

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

export class PhotosList implements OnInit{
// Масив mock-даних
  photos: Photo[] = [];

  constructor(private photoData: PhotoData) { };

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
  };

  ngOnInit(): void {
    this.photos = this.photoData.getItems();
  }
}
