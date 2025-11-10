import { Component, HostListener, OnDestroy } from '@angular/core';
import { ProfileService } from '../../services/profile-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  imports: [MatIconModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnDestroy {
  userProfile: any;
  posts: any;

  selectedPost: string | null = null;

  categories: string[] = [
    'About',
    'Posts',
    'Experience'
  ]

  selectedCategory: string = 'Posts';

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  constructor(private profileService: ProfileService) { }
  
  ngOnInit() {
    // Dummy user profile data
    this.userProfile = this.profileService.getUserProfile();
    this.posts = ['banner.jpg', 'banner.jpg', 'baahubali.jpg','banner.jpg', 'banner.jpg', 'baahubali.jpg',
      'banner.jpg', 'banner.jpg', 'baahubali.jpg','banner.jpg', 'banner.jpg', 'baahubali.jpg',
      'banner.jpg', 'banner.jpg', 'baahubali.jpg','banner.jpg', 'banner.jpg', 'baahubali.jpg',
      'banner.jpg', 'banner.jpg', 'baahubali.jpg','banner.jpg', 'banner.jpg', 'baahubali.jpg',
      'banner.jpg', 'banner.jpg', 'baahubali.jpg','banner.jpg', 'banner.jpg', 'baahubali.jpg',
    ];
  }

  openPost(url: string) {
    this.selectedPost = url;
    // prevent background scroll while modal open
    try { document.body.style.overflow = 'hidden'; } catch {}
  }

  closePost() {
    this.selectedPost = null;
    try { document.body.style.overflow = ''; } catch {}
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEsc(event: Event) {
    const ke = event as KeyboardEvent;
    if (ke?.key === 'Escape' && this.selectedPost) {
      this.closePost();
    }
  }

  ngOnDestroy() {
    try { document.body.style.overflow = ''; } catch {}
  }
}
