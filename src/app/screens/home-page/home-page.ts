import { Component } from '@angular/core';
import { FeedCategory } from '../../models/FeedCategory';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FeedPost } from '../../components/feed-post/feed-post';
import { FeedPostService } from '../../services/feed-post-service';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-home-page',
  imports: [MatFormFieldModule, MatSelectModule, FeedPost],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

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
      {name: 'Surya', unreadCount: 4},
      {name: 'Prakash', unreadCount: 2},
      {name: 'Dama', unreadCount: 1}
    ]
  }
}
