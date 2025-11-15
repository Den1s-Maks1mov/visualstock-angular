import {Component, Input, Output, EventEmitter} from '@angular/core';
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

  @Output() onSelect = new EventEmitter<Photo>();

  onDetailsClick(): void {
    this.onSelect.emit(this.photoData)
  }
}
