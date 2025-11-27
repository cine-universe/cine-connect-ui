import { Component, HostListener } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FeedPost } from '../../components/feed-post/feed-post';
import { FeedPostService } from '../../services/feed-post-service';
import { Post } from '../../models/Post';
import { HomeProfile } from '../../components/home-profile/home-profile';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MobileHeader } from '../../components/mobile-header/mobile-header';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterModule, 
    MatIcon,
    MatFormFieldModule, 
    MatSelectModule, 
    FeedPost, 
    HomeProfile,
    MobileHeader],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

  showScrollTop = false;
  posts: Post | any;

  openings: any;
  newMessages: any;

  constructor(
    private feedPostService: FeedPostService
  ) {
    this.posts = feedPostService.getPosts();
    this.openings = [
      {projectName: 'Bhairava', postingTime: '3 hours ago'},
      {projectName: 'Kantara 3', postingTime: '4 hours ago'},
      {projectName: 'Jack', postingTime: '5 hours ago'}
    ]
    this.newMessages =[
      {name: 'Mike', unreadCount: 4},
      {name: 'Rock', unreadCount: 2},
      {name: 'John', unreadCount: 100}
    ]
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTop = window.scrollY > 200; // show after 200px scroll
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }
}
