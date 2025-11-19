import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCardHover]',
  standalone: true
})
export class CardHover {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter(): void {
    // Зміна стилів при наведенні
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-5px)');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 8px 25px rgba(0, 0, 0, 0.2)');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    // Повернення оригінальних стилів
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 4px 12px rgba(0, 0, 0, 0.1)');
  }
}
