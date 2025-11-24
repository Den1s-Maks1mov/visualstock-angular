import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoData } from './photo-data';
import { Photo } from '../../core/models/photo.interface';

describe('PhotoDataService', () => {
  let service: PhotoData;
  let httpMock: HttpTestingController;
  const API_ENDPOINT = 'photos.json';

  const mockFirebaseResponse = {
    '-Na0e_qsz7acpqiLXA2F': { pImage: 'url-1', title: 'Test 1', author: 'A', views: 100, isPremium: false, tags: ['a'], uploadDate: '2025-01-01' },
    '-Nb1f_rqs9bcdriLYB3G': { pImage: 'url-2', title: 'Test 2', author: 'B', views: 50, isPremium: true, tags: ['b'], uploadDate: '2025-01-02' }
  };

  const expectedPhotos: Photo[] = Object.keys(mockFirebaseResponse).map(key => ({
    ...mockFirebaseResponse[key as keyof typeof mockFirebaseResponse],
    id: key,
    tags: [ 'a', 'b' ],
    uploadDate: new Date('2025-01-01') as any
  }));


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoData]
    });

    service = TestBed.inject(PhotoData);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch photos and transform Firebase object to Photo[] array', () => {
    service.fetchPhotos().subscribe(photos => {
      expect(photos.length).toBe(2);
      expect(photos[0].title).toBe('Test 1');
      expect(photos[0].id).toBe('-Na0e_qsz7acpqiLXA2F');
    });

    const req = httpMock.expectOne(API_ENDPOINT);
    expect(req.request.method).toBe('GET');

    req.flush(mockFirebaseResponse);
  });
});
