import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile-service';

@Component({
  selector: 'app-mobile-header',
  imports: [],
  templateUrl: './mobile-header.html',
  styleUrl: './mobile-header.scss',
})
export class MobileHeader {
  profilePic: string;

  mobileMenuOpen = false;
  unreadMessagesCount = 0;
  unreadNotificationsCount = 0;

  constructor(private router: Router,
    private readonly profileService: ProfileService
  ) {
    this.profilePic = this.profileService.userProfile.avatarUrl;
  }

  ngOnInit(): void {
    // existing initialization...
    this.updateBadges();
  }

  openMobileMenu(): void {
    this.mobileMenuOpen = true;
    try { document.body.style.overflow = 'hidden'; } catch {}
    this.updateBadges();
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    try { document.body.style.overflow = ''; } catch {}
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToMessages(): void {
    this.router.navigate(['/messages']);
  }

  private updateBadges(): void {
    // compute unread message total and unread notifications
    this.unreadMessagesCount = 20;
    this.unreadNotificationsCount = 32;
  }
}
