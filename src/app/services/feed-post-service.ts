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
        title : 'Rajamouli',
        subtitle : 'Varanasi',
        mediaType: MediaType.Image,
        mediaUrl : 'assets/varanasi.png',
        articleText : '',
        description : 'Acted by Maheshbabu, Roaring like audible to Global the indian cinema at its peak level.Acted by Maheshbabu, Roaring like audible to Global the indian cinema at its peak levelActed by Maheshbabu, Roaring like audible to Global the indian cinema at its peak level',
        likesCount: 120,
        commentsCount: 250,
        sharesCount: 25,
        isLiked: false
      }, {
        id: 2,
        userId: 1,
        avatarUrl: 'banner.jpg',
        title : 'Trivikram',
        subtitle : 'Baahubali The Epic',
        mediaType: MediaType.Image,
        mediaUrl : 'baahubali.jpg',
        articleText : '',
        description : 'Epic movie',
        likesCount: 23461,
        commentsCount: 45632,
        sharesCount: 453,
        isLiked: false
      }, {
        id: 3,
        userId: 1,
        avatarUrl: 'banner.jpg',
        title : 'Trivikram',
        subtitle : 'Baahubali The Epic',
        mediaType: MediaType.Youtube,
        mediaUrl : 'https://www.youtube.com/embed/MPeSGPUFdto?si=IR3wGcSK2B5aokwm',
        articleText : '',
        description : 'Epic movie',
        likesCount: 13,
        commentsCount: 4,
        sharesCount: 2,
        isLiked: false
      }, 
    ]

    return posts;
  }
}
