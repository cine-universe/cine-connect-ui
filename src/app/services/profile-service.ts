import { Injectable } from '@angular/core';
import { UserProfile } from '../models/UserProfile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  getUserProfile(): UserProfile {
    let userDetails: UserProfile = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatarUrl: 'banner.jpg',
      primarySkills: ['Admin', 'Editor'],
      skills: ['Acting', 'Editing', 'Singing'],
      projectsCount: 12,
      bio: '',
      achievements: [{
        id: 1,
        userId: 1,
        award: 'Steller',
        category: 'Editing',
        year: 2024,
        event: 'SIMA 2024'
      }]
    };
    return userDetails;
  }
}
