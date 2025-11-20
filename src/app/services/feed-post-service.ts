import { Injectable } from '@angular/core';
import { MediaType, Post } from '../models/Post';

@Injectable({
  providedIn: 'root',
})
export class FeedPostService {

  getPosts() {
    let posts = [{
        id: 1,
        userId: 1,
        avatarUrl: 'banner.jpg',
        title : 'Trivikram',
        subtitle : 'ASVR',
        mediaType: MediaType.Image,
        mediaUrl : 'assets/varanasi.png',
        articleText : '',
        description : 'Epic movie'
      }, {
        id: 1,
        userId: 1,
        avatarUrl: 'banner.jpg',
        title : 'Trivikram',
        subtitle : 'ASVR',
        mediaType: MediaType.Youtube,
        mediaUrl : 'https://www.youtube.com/embed/GFCvD76qwPA?si=tYzFKfZpyJ-WDI1D',
        articleText : '',
        description : 'Epic movie'
      }
    ]

    return posts;
  }
}
