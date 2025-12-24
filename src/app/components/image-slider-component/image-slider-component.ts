import { Component, input, signal, computed, effect, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Slide {
  url: string;
  title?: string;
}

@Component({
  selector: 'app-image-slider',
  imports: [CommonModule],
  templateUrl: './image-slider-component.html',
  styleUrl: './image-slider-component.scss',
})
export class ImageSliderComponent {
  slides = input.required<Slide[]>();
  currentIndex = signal(0);
  
  // 1. Reference to the timer so we can stop it
  private slideInterval: any;
  // 2. Inject DestroyRef for cleanup
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.startAutoSlide();

    // 3. Automatically clear the timer when the component is destroyed
    this.destroyRef.onDestroy(() => {
      this.stopAutoSlide();
    });
  }

  // Timer Logic
  startAutoSlide() {
    // Clear any existing timer first to be safe
    this.stopAutoSlide(); 
    this.slideInterval = setInterval(() => {
      this.goToNext();
    }, 5000); // 5000ms = 5 seconds
  }

  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  // Navigation Logic
  goToNext(): void {
    this.currentIndex.update((index) => 
      index < this.slides().length - 1 ? index + 1 : 0
    );
  }

  goToPrevious(): void {
    this.currentIndex.update((index) => 
      index > 0 ? index - 1 : this.slides().length - 1
    );
  }

  goToSlide(index: number): void {
    this.currentIndex.set(index);
    // Optional: Reset timer when user manually clicks
    this.startAutoSlide(); 
  }

  transformStyle = computed(() => 
    `translateX(-${this.currentIndex() * 100}%)`
  );
}