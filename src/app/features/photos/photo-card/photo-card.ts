import {Component, Input} from '@angular/core';
import { Photo } from '../../../core/models/photo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-card.html',
  styleUrl: './photo-card.css',
})

export class PhotoCard {
  @Input() photoData!: Photo;
}
