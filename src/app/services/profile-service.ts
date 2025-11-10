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
      roles: ['Admin', 'Editor'],
      projectsCount: 12
    };
    return userDetails;
  }
}
