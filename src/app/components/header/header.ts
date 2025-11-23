import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {Auth} from '../../core/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
  appTitle: string = 'VisualStock - discover our world';
  private authService = inject(Auth);

  // Observable для використання в шаблоні
  isAuthenticated$!: Observable<boolean>;
  currentUserLogin$!: Observable<string | null>;

  // Властивість для керування текстом кнопки (відображення пошти/нікнейма)
  buttonText: string | null = null;

  // Флаг для відстеження стану наведення курсора
  isHovering: boolean = false;

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.currentUserLogin$ = this.authService.userLogin$;

    // Підписка для оновлення тексту кнопки при зміні стану
    this.currentUserLogin$.subscribe(login => {
      // Ініціалізуємо кнопку логіном користувача
      this.buttonText = login;
    });
  }
    onLogout(): void {
      this.authService.logout();
    }

    // Обробник події "наведення курсора"
    onMouseEnter(): void {
      if(this.authService.getAuthStatus()
  )
    {
      this.isHovering = true;
    }
  }

    // Обробник події "курсор відведено"
    onMouseLeave(): void {
      if (this.authService.getAuthStatus()
      ) {
        this.isHovering = false;
      }
    }
  }
