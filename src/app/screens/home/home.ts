import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  region = 'SKHT, AP, IND';
  title = 'Baahubali The Eternal war';
  description = 'An epic action movie that tells the story of a legendary warrior and his quest for justice.';
  bannerImage = 'baahubali.jpg';
  images: string[] = [
    'baahubali.jpg',
    'banner.jpg'
  ];

  get bannerUrlValue(): string {
    return `url('${this.bannerImage}')`;
  }
}
