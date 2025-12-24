import { Component, EventEmitter, Output } from '@angular/core';
import { ImageSliderComponent, Slide } from '../image-slider-component/image-slider-component';

@Component({
  selector: 'app-landing-component',
  imports: [
    ImageSliderComponent
  ],
  templateUrl: './landing-component.html',
  styleUrl: './landing-component.scss',
})
export class LandingComponent {

  @Output() enableLogin = new EventEmitter<boolean>();
  myImages: Slide[] = [
    { url: 'assets/images/avatar3.jpg', title: 'Avatar Fire & Ash' },
    { url: 'assets/images/varanasi.jpg', title: `SS Rajamouli's Varanasi` },
    { url: 'assets/images/stranger-things-s5.jpg', title: 'Stranger Things Season 5' },
  ];

  onLogin() {
    this.enableLogin.emit(true);
  }
}
