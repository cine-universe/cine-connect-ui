import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Post } from '../../models/Post';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-feed-post',
  imports: [CommonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatCardModule, 
    MatFormFieldModule,
    MatIconModule, 
    MatButtonModule],
  templateUrl: './feed-post.html',
  styleUrl: './feed-post.scss',
})
export class FeedPost {
  @Input() post: Post | any;
  sanitizedYouTubeUrl: SafeResourceUrl = '';

  newComment: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    if (this.post.mediaType === 'Youtube') {
      this.sanitizedYouTubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.post.mediaUrl);
    }
  }

  likePost() {
    console.log('Liked!');
  }

  commentControl = new FormControl('');

  sendComment() {
    const comment = this.commentControl.value?.trim();
    if (comment) {
      console.log('Comment:', comment);
      this.commentControl.reset();
    }
  }
}
