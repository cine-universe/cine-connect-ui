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

  categories = FeedCategory;
  selectedCategory: FeedCategory | null = null;

  posts: Post | any;

  constructor(
    private feedPostService: FeedPostService
  ) {
    this.posts = feedPostService.getPosts();
  }

  get categoryList() {
    return Object.values(FeedCategory);
  }
  
  onCategoryChange(event: MatSelectChange) {
    this.selectedCategory = event.value
  }
}
