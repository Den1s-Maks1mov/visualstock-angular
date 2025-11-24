import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PhotoCard } from './photo-card';
import { Photo } from '../../../core/models/photo.interface';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('PhotoCardComponent', () => {
  let fixture: ComponentFixture<PhotoCard>;
  let component: PhotoCard;
  let compiled: HTMLElement;

  const mockPhoto: Photo = {
    id: '123',
    title: 'Sunny Day',
    author: 'Test User',
    pImage: '/assets/test.jpg',
    views: 6000,
    isPremium: true,
    tags: ['sunny', 'day'],
    uploadDate: new Date ('2025-10-20')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [PhotoCard, RouterTestingModule, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoCard);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should display the title and author correctly', () => {
    component.photoData = mockPhoto;
    fixture.detectChanges();

    expect(compiled.querySelector('.card-title')?.textContent).toContain(mockPhoto.title);
    expect(compiled.querySelector('.card-author')?.textContent).toContain(mockPhoto.author);
  });

  it('should show the PREMIUM badge if isPremium is true', () => {
    component.photoData = {...mockPhoto, isPremium: true} as Photo;
    fixture.detectChanges();

    const premiumBadge = compiled.querySelector('.premium-badge');
    expect(premiumBadge).toBeTruthy();
    expect(premiumBadge?.textContent).toContain('PREMIUM');
  });

  it('should apply the POPULAR class if views > 5000', () => {
    component.photoData = {...mockPhoto, views: 6000} as Photo;
    fixture.detectChanges();

    const cardContainer = compiled.querySelector('.photo-card-container');
    expect(cardContainer?.classList).toContain('popular-card-highlight');
  });
});

