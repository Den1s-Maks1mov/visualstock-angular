import { Component, OnInit } from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import { Photo } from '../../../core/models/photo.interface';
import {PhotoCard} from '../photo-card/photo-card';
import { FormsModule } from '@angular/forms';
import { PhotoData } from '../../../core/services/photo-data';
import { Observable, Subscription } from 'rxjs';
import {RouterLink} from '@angular/router';
import {CardHover} from '../../../shared/directives/card-hover';

@Component({
  selector: 'app-photos-list',
  standalone: true,
  imports: [
    CommonModule,
    PhotoCard,
    FormsModule,
    AsyncPipe,
    RouterLink,
    CardHover
  ],
  templateUrl: './photos-list.html',
  styleUrl: './photos-list.css',
})

export class PhotosList implements OnInit{
  photos$!: Observable<Photo[]>;

  private _searchTerm: string = '';
  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.photoData.filterItems(value);
  }

  constructor(private photoData: PhotoData) { };

  ngOnInit(): void {
    this.photoData.fetchPhotos().subscribe();
    this.photos$ = this.photoData.photos$;
  }
}
