import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Footer
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class LayoutComponent {

}
