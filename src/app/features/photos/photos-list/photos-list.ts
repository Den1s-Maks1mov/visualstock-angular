import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photo } from '../../../core/models/photo.interface';
import {PhotoCard} from '../photo-card/photo-card';
import { FormsModule } from '@angular/forms';
import { PhotoData } from '../../../core/services/photo-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-photos-list',
  standalone: true,
  imports: [
    CommonModule,
    PhotoCard,
    FormsModule
  ],
  templateUrl: './photos-list.html',
  styleUrl: './photos-list.css',
})

export class PhotosList implements OnInit, OnDestroy{
// Масив mock-даних
  photos: Photo[] = [];

  private _searchTerm: string = '';
  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.photoData.filterItems(value);
  }

  private dataSubscription: Subscription | undefined;

  constructor(private photoData: PhotoData) { };

  ngOnInit(): void {
    this.dataSubscription = this.photoData.photos$.subscribe({
      next: (data: Photo[]) => {
        this.photos = data;
      }
    });
  }

    ngOnDestroy(): void {
      this.dataSubscription?.unsubscribe();
    }
}
