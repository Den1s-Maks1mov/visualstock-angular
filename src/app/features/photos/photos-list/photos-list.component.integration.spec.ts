import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PhotosList } from './photos-list';
import { PhotoCard } from '../photo-card/photo-card';
import { Photo } from '../../../core/models/photo.interface';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {of} from 'rxjs';

const mockPhoto: Photo = {
  id: 'test-id-1',
  title: 'Integration Test Photo',
  author: 'Integration Tester',
  pImage: 'test-url',
  views: 1,
  isPremium: false,
  tags: [],
  uploadDate: new Date() as any
};

describe('PhotosListComponent Integration Test', () => {
  let fixture: ComponentFixture<PhotosList>;
  let parentComponent: PhotosList;
  let cardElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotosList],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotosList);
    parentComponent = fixture.componentInstance;

    parentComponent.photos$ = of([mockPhoto]);
    fixture.detectChanges();

    cardElement = fixture.debugElement.query(By.directive(PhotoCard));
  });

  it('should call handlePhotoSelection and log data when child component emits onSelect', () => {
    spyOn(parentComponent, 'handlePhotoSelection');

    cardElement.triggerEventHandler('onSelect', mockPhoto);

    expect(parentComponent.handlePhotoSelection).toHaveBeenCalledWith(mockPhoto);
  });
});
