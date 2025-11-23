import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Post } from '../../models/Post';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IconsService } from '../../services/icons-service';

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

  constructor(private sanitizer: DomSanitizer,
    private iconsService: IconsService
  ) {
    iconsService.registerIcons();
  }

  ngOnChanges() {
    if (this.post.mediaType === 'Youtube') {
      this.sanitizedYouTubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.post.mediaUrl);
    }
  }

  likePost() {
    if(this.post.isLiked) {
      this.post.isLiked = false;
      this.post.likesCount--;
    } else {
      this.post.isLiked =true;
      this.post.likesCount++;
    }
  }

  commentControl = new FormControl('');

  sendComment() {
    const comment = this.commentControl.value?.trim();
    if (comment) {
      console.log('Comment:', comment);
      this.commentControl.reset();
    }
  }

  expandedIds = new Set<number | string>();

  isLongDescription(exp: any): boolean {
    const count = (exp?.description || '').trim().split(/\s/).filter(Boolean).length;
    return count > 10;
  }

  getShortDescription(exp: any): string {
    const words = (exp?.description || '').trim().split(/\s/).filter(Boolean);
    if (words.length <= 10) return exp?.description || '';
    return words.slice(0, 10).join(' ') + '...';
  }

  toggleExpand(id: number | string) {
    if (this.expandedIds.has(id)) this.expandedIds.delete(id);
    else this.expandedIds.add(id);
  }

  isExpanded(id: number | string) {
    return this.expandedIds.has(id);
  }

  incrementLikeCount() {
    if(!this.post.isLiked) {
      this.post.isLiked = true
      this.post.likesCount = this.post.likesCount + 1;
    }
  }

  @ViewChild('commentInput', { static: false }) 
  commentField!: ElementRef<HTMLTextAreaElement>; 

  focusCommentArea(): void {
    if (this.commentField) {
      this.commentField.nativeElement.focus();
    }
  }
}
