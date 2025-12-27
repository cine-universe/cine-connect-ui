import { Injectable } from '@angular/core';
import { MediaType, Post } from '../models/Post';
import { timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedPostService {

  getPosts() {
    let posts = [{
        id: 1,
        userId: 1,
        avatarUrl: 'https://picsum.photos/id/281/200/200',
        title : 'Rajamouli',
        subtitle : 'Varanasi',
        mediaType: MediaType.Image,
        mediaUrl : 'assets/varanasi.png',
        articleText : '',
        description : 'Acted by Maheshbabu, Roaring like audible to Global the indian cinema at its peak level.Acted by Maheshbabu, Roaring like audible to Global the indian cinema at its peak levelActed by Maheshbabu, Roaring like audible to Global the indian cinema at its peak level',
        likesCount: 120,
        commentsCount: 250,
        sharesCount: 25,
        isLiked: false,
        timestamp: new Date('2025-11-24T10:30:00')
      }, {
        id: 2,
        userId: 1,
        avatarUrl: 'https://picsum.photos/id/287/200/200',
        title : 'Prabhas',
        subtitle : 'Baahubali The Epic',
        mediaType: MediaType.Image,
        mediaUrl : 'baahubali.jpg',
        articleText : '',
        description : 'Epic movie',
        likesCount: 23461,
        commentsCount: 45632,
        sharesCount: 453,
        isLiked: false,
        timestamp: new Date('2024-06-20T10:30:00')
      }, {
        id: 3,
        userId: 1,
        avatarUrl: 'https://picsum.photos/id/288/200/200',
        title : 'Steven Spielberg',
        subtitle : 'Venom Last Dance',
        mediaType: MediaType.Youtube,
        mediaUrl : 'https://www.youtube.com/embed/MPeSGPUFdto?si=IR3wGcSK2B5aokwm',
        articleText : '',
        description : 'Epic movie',
        likesCount: 13,
        commentsCount: 4,
        sharesCount: 2,
        isLiked: false,
        timestamp: new Date('2025-11-25T08:30:00')
      }, {
        id: 4,
        userId: 1,
        avatarUrl: 'https://picsum.photos/id/289/200/200',
        title : 'FondMan',
        subtitle : 'Tears of Steel',
        mediaType: MediaType.Video,
        mediaUrl : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        articleText : '',
        description : 'Tears of Steel is a short science fiction film by the Blender Institute, part of the Blender Foundation. It was made using open source software, primarily Blender, and released in 2012 to showcase the capabilities of open source tools in producing high-quality visual effects and animation.',
        likesCount: 132,
        commentsCount: 32,
        sharesCount: 1,
        isLiked: false,
        timestamp: new Date('2025-06-20T10:30:00')
      }, 
    ]

    return posts;
  }
}
