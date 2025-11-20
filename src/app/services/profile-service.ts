import { Injectable } from '@angular/core';
import { UserProfile } from '../models/UserProfile';
import { Experience, ProductionType } from '../models/Experience';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  
  private experiencesSubject = new BehaviorSubject<Experience[]>([]);
  experience$ = this.experiencesSubject.asObservable();

  setExperiences(exps: Experience[]) {
    this.experiencesSubject.next(exps);
  }

  updateExperience(updated: Experience) {
    const current = this.experiencesSubject.value;
    const next = current.map((e: Experience) => e.id === updated.id ? updated : e);
    this.experiencesSubject.next(next);
  }

  addExperience(added: Experience) {
    const current = this.experiencesSubject.value;
    current.push(added);
    this.experiencesSubject.next(current)
  }

  getUserProfile(): UserProfile {
    let userDetails: UserProfile = {
      id: 1,
      name: 'SS Rajamouli',
      email: 'ss.rajamouli@gmail.com',
      avatarUrl: 'banner.jpg',
      primarySkills: ['Director'],
      skills: ['Direction', 'Writing', 'Fighting'],
      projectsCount: 0,
      bio: '',
      achievements: [{
        id: 1,
        userId: 1,
        award: 'Steller',
        category: 'Editing',
        year: 2024,
        event: 'SIMA 2024'
      }],
      experiences: [
          {
            id: 1,
            userId: 101,
            projectTitle: 'Varanasi',
            role: 'Director',
            productionType: ProductionType.Commercial,
            productionCompany: 'Midnight Studios',
            location: 'Hyderabad, IN',
            startDate: new Date('2022-03-01'),
            endDate: new Date('2027-03-15'),
            description: 'Directed a 110-minute thriller; responsible for creative direction and post-production.Directed a 110-minute thriller; responsible for creative direction and post-production.Directed a 110-minute thriller; responsible for creative direction and post-production.Directed a 110-minute thriller; responsible for creative direction and post-production.Directed a 110-minute thriller; responsible for creative direction and post-production.'
          },
          {
            id: 2,
            userId: 101,
            projectTitle: 'Khaa',
            role: 'Producer',
            productionType: ProductionType.Experimental,
            productionCompany: 'FrameWorks',
            location: 'Vizag, IN',
            startDate: new Date('2021-06-10'),
            endDate: new Date('2021-07-25'),
            description: 'Produced a 90-minute experimental that screened at regional festivals.'
          },
          {
            id: 3,
            userId: 101,
            projectTitle: 'Yamadonga',
            role: 'Cinematographer',
            productionType: ProductionType.Documentary,
            productionCompany: 'NatureView',
            location: 'Kerala, IN',
            startDate: new Date('2020-11-01'),
            endDate: new Date('2021-02-10'),
            description: 'Shot documentary sequences across multiple locations; managed camera and lighting teams.'
          }
        ]
    };
    this.setExperiences(userDetails.experiences)
    return userDetails;
  }
}
