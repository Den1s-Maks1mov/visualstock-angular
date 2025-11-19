import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PhotoData } from '../../../core/services/photo-data';
import { Photo } from '../../../core/models/photo.interface';
import { Observable } from 'rxjs';

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
    this.photoId = this.route.snapshot.params['id'];

    this.photo$ = this.photoDataService.getPhotoById(this.photoId);
  }
}
