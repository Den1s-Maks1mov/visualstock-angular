// src/app/shared/components/header/header.component.ts

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
  styleUrl: './header.css'
})
export class Header implements OnInit {

  private authService = inject(Auth);

  // Observable для використання в шаблоні
  isAuthenticated$!: Observable<boolean>;
  currentUserLogin$!: Observable<string | null>;

  // Флаг для відстеження стану наведення курсора
  isHovering: boolean = false;

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.currentUserLogin$ = this.authService.userLogin$;
  }

  onLogout(): void {
    this.authService.logout();
  }

  // Обробник події "наведення курсора"
  onMouseEnter(): void {
    // Вмикаємо hover тільки, якщо користувач авторизований
    if (this.authService.getAuthStatus()) {
      this.isHovering = true;
    }
  }

  // Обробник події "курсор відведено"
  onMouseLeave(): void {
    if (this.authService.getAuthStatus()) {
      this.isHovering = false;
    }
  }
}
