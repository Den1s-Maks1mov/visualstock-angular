import { Injectable } from '@angular/core';
import {Photo} from '../models/photo.interface';
import { Observable, BehaviorSubject, map, find } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoData {
  private   photos: Photo[] = [
    { id: '1', title: 'Mountain lake Vista', author: 'Nikita2504', pImage: 'assets/images/photo-1.jpg', views: 1240, isPremium: false, tags: ['nature', 'landscape'], uploadDate: new Date('2024-06-15') },
    { id: '2', title: 'Minimalist coffee break', author: 'Janet 2389', pImage: 'assets/images/photo-2.jpg', views: 80, isPremium: false, tags: ['food', 'lifestyle'], uploadDate: new Date('2024-07-20') },
    { id: '3', title: 'Neon Cyberpunk City', author: 'Mike Clubnika', pImage: 'assets/images/photo-3.jpg', views: 5200, isPremium: false, tags: ['city', 'neon', 'tech'], uploadDate: new Date('2024-05-10') },
    { id: '4', title: 'High contrast Street Life', author: 'V1ktor1', pImage: 'assets/images/photo-4.jpg', views: 85000, isPremium: true, tags: ['city', 'monochrome', 'street photography', 'architecture'], uploadDate: new Date('2024-04-01') },
  ];

  private photosSubject = new BehaviorSubject<Photo[]>(this.photos);

  public photos$: Observable<Photo[]> = this.photosSubject.asObservable();

  filterItems(searchTerm: string): void {
    if (!searchTerm) {
      this.photosSubject.next(this.photos);
      return;
    }

    const term = searchTerm.toLowerCase();

    const filtered = this.photos.filter(photo =>
      photo.title.toLowerCase().includes(term) ||
      photo.author.toLowerCase().includes(term)
    );

    this.photosSubject.next(filtered);
  };

  getPhotoById(id: string): Observable<Photo | undefined> {
    return this.photosSubject.asObservable().pipe(
      map(photos => photos.find(photo => photo.id === id))
    );
  }
}
