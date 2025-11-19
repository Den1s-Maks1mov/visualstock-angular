import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Photo } from '../../../core/models/photo.interface';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import { TruncatePipe } from '../../../shared/pipes/truncate-pipe';
import { CardHover } from '../../../shared/directives/card-hover';

@Component({
  selector: 'app-photo-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TruncatePipe, CardHover],
  templateUrl: './photo-card.html',
  styleUrl: './photo-card.css',
})

export class PhotoCard {
  @Input() photoData!: Photo;
}
