import { Injectable } from '@angular/core';
import {Photo} from '../models/photo.interface';
import {Observable, BehaviorSubject, map, find, catchError, throwError, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

// Функція для перетворення рядка "tag1, tag2" у масив
const ensureTagsArray = (tagsData: any): string[] => {

  if (Array.isArray(tagsData)) {
    return tagsData.map(tag => String(tag).trim());
  }

  if (typeof tagsData === 'string') {
    return tagsData.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  }
  return [];
};

@Injectable({
  providedIn: 'root',
})


export class PhotoData {
  private photos: Photo[] = [];
  private API_ENDPOINT = 'photos.json';

  private photosSubject = new BehaviorSubject<Photo[]>([]);
  public photos$: Observable<Photo[]> = this.photosSubject.asObservable();

  public searchTerm: string = '';

  constructor(private http: HttpClient) { }

  filterItems(searchTerm: string): void {
    // Логіка фільтрації, яка бере останнє значення (photosSubject.getValue) і оновлює Subject
    const allPhotos = this.photosSubject.getValue();
    if (!searchTerm) {
      this.photosSubject.next(allPhotos);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = allPhotos.filter(photo =>
      photo.title.toLowerCase().includes(term) ||
      photo.author.toLowerCase().includes(term)
    );

    this.photosSubject.next(filtered);
  }

  getPhotoById(id: string): Observable<Photo | undefined> {
    const detailEndpoint = `photos/${id}.json`;

    return this.http.get<Photo>(detailEndpoint).pipe(
      map(response => {
        if (!response) {
          return undefined;
        }

        // Трансформація tags у масив
        response.tags = ensureTagsArray(response.tags);

        return { ...response, id: id };
      }),
      catchError(error => {
        if (error.status === 404) {
          return of(undefined);
        }
        // Перенаправлення помилки до загального обробника
        return this.handleError(error);
      })
    );
  }

  // Метод GET - Отримання всіх фотографій
  fetchPhotos(): Observable<Photo[]> {
    return this.http.get<{[key: string]: Photo}>(this.API_ENDPOINT).pipe(
      // Трансформація: Об'єкт Firebase -> Масив Photo[]
      map(response => {
        if (!response) return [];

        const photosArray: Photo[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const photo = response[key] as Photo;
            photo.tags = ensureTagsArray(photo.tags);
            photosArray.push({ ...photo, id: key });
          }
        }
        return photosArray;
      }),
      // Оновлення BehaviorSubject
      map(photos => {
        this.photosSubject.next(photos);
        return photos;
      }),
      // Обробка помилок
      catchError(this.handleError.bind(this))
    );
  }

  addPhoto(newPhoto: Photo): void {
    this.http.post<{name: string}>(this.API_ENDPOINT, newPhoto).pipe(
      catchError(error => this.handleError(error))
    ).subscribe((response: {name: string}) => {
      const currentPhotos = this.photosSubject.getValue();
      const addedPhoto: Photo = { ...newPhoto, id: response.name };
      this.photosSubject.next([...currentPhotos, addedPhoto]);
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Невідома помилка HTTP.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Помилка клієнта: ${error.error.message}`;
    } else {
      errorMessage = `Помилка сервера: ${error.status} - ${error.statusText || ''}. ${error.error?.error || ''}`;
    }

    console.error('HTTP ERROR:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
