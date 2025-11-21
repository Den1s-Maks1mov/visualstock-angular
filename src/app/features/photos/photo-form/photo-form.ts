import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PhotoData } from '../../../core/services/photo-data';
import { Photo } from '../../../core/models/photo.interface';
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'; // <--- Імпорт Sanitize

@Component({
  selector: 'app-photo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './photo-form.html',
  styleUrl: './photo-form.css',
})
export class PhotoForm implements OnInit {

  photoForm!: FormGroup;
  isDragOver: boolean = false;
  previewUrl: SafeUrl | null = null;

  constructor(
    private photoService: PhotoData,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.photoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      pImage: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required),
      isPremium: new FormControl(false),
    });
  }

  // Геттери
  get title() { return this.photoForm.get('title'); }
  get author() { return this.photoForm.get('author'); }
  get pImage() { return this.photoForm.get('pImage'); }
  get tags() { return this.photoForm.get('tags'); }
  get isPremium() { return this.photoForm.get('isPremium'); }

// Реалізація DRAG-AND-DROP
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    const file = event.dataTransfer?.files[0];
    if (file) {
      this.processFile(file);
    }
  }

  // Метод для обробки події зміни файлу
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;

    if (file) {
      this.processFile(file);
    }
  }

  clearImage(): void {
    this.pImage?.setValue('');
    this.previewUrl = null;
  }

  // Обробка файлу (перевірка формату та конвертація)
  processFile(file: File): void {
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Url = reader.result as string;

        // 1. Встановлюємо Base64 у FormControl
        this.pImage?.setValue(base64Url);

        // 2. Встановлюємо безпечний URL для попереднього перегляду
        this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(base64Url);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Невірний формат файлу. Використовуйте лише PNG або JPEG.');
      this.pImage?.setValue(''); // Скидаємо значення
      this.previewUrl = null;
    }
  }

  onSubmit(): void {
    if (this.photoForm.valid) {
      const formData = this.photoForm.value;

      const newPhoto: Photo = {
        tags: formData.tags.split(',').map((tag: string) => tag.trim()),
        id: Date.now().toString(),
        views: 0,
        // photoData.url зберігає Base64-рядок
        pImage: formData.pImage,
        uploadDate: new Date(),
        ...formData,
      };

      this.photoService.addPhoto(newPhoto);

      this.photoForm.reset({ isPremium: false });
      this.router.navigate(['/photos']);

    } else {
      console.warn('Форма невалідна. Виправте помилки.');
      this.photoForm.markAllAsTouched();
    }
  }
}
