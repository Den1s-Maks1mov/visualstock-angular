import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Photo } from '../../../core/models/photo.interface';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-photo-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './photo-card.html',
  styleUrl: './photo-card.css',
})

export class PhotoCard {
  @Input() photoData!: Photo;
}
