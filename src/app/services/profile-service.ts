import { Injectable } from '@angular/core';
import { UserProfile } from '../models/UserProfile';
import { Experience, ProductionType } from '../models/Experience';
import { BehaviorSubject } from 'rxjs';
import { Achievements } from '../models/Achievements';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  
  private experiencesSubject = new BehaviorSubject<Experience[]>([]);
  experience$ = this.experiencesSubject.asObservable();

  private descriptionSubject = new BehaviorSubject<string>('');
  description$ = this.descriptionSubject.asObservable();

  private achievementSubject = new BehaviorSubject<Achievements[]>([]);
  achivement$ = this.achievementSubject.asObservable();

  userProfile: UserProfile | any;
  constructor() {
    this.userProfile = this.getUserProfile(); 
  }

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

  deleteExperience(index: number) {
    const current = this.experiencesSubject.value
    const next = current.filter((a: Experience) => a.id !== index);
    this.experiencesSubject.next(next);
  }

  updateDescription(desc: string) {
    this.descriptionSubject.next(desc);
  }

  setAchievements(achievements: Achievements[]) {
    this.achievementSubject.next(achievements);
  }

  updateAchievement(updated: Achievements) {
    const current = this.achievementSubject.value;
    const next = current.map((a: Achievements) => a.id === updated.id ? updated : a);
    this.achievementSubject.next(next);
  }

  addAchievement(added: Achievements) {
    const current = this.achievementSubject.value;
    current.push({...added, id: 4, userId: this.userProfile.userId});
    this.achievementSubject.next(current);
  }

  deleteAchievement(index: number) {
    const current = this.achievementSubject.value
    const next = current.filter((a: Achievements) => a.id !== index);
    this.achievementSubject.next(next);
  }

  getUserProfile(): UserProfile {
    this.userProfile = {
      id: 1,
      location: 'Hyderabad, IND',
      name: 'SS Rajamouli',
      email: 'ss.rajamouli@gmail.com',
      avatarUrl: 'assets/cyber-punk.jpg',
      primarySkill: 'Director',
      skills: ['Direction', 'Writing', 'Fighting'],
      projectsCount: 0,
      bio: '',
      links: 254,
      achievements: this.getAchievements(),
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
    this.setExperiences(this.userProfile.experiences);
    this.updateDescription(this.userProfile.bio || '');
    this.setAchievements(this.userProfile.achievements);
    return this.userProfile;
  }

  getHomeProfile() {
    let homeProfile = {
      id: this.userProfile.id,
      name: this.userProfile.name,
      avatarUrl: this.userProfile.avatarUrl,
      links: this.userProfile.links,
      experiences: this.userProfile.experiences.length
    };
    return homeProfile;
  }

  getAchievements() {
    const achievement: Achievements[] = [{
      id: 1,
      userId: 1,
      filmTitle: 'RRR',
      year: 2024,
      category: 'Best Director',
      event: 'Academy Awards (Oscars)',
      eventLocation: 'Dallas, USA',
      verificationLink: 'https://simaawards.com/2024/winners',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      userId: 1,
      filmTitle: 'Baahubali 2',
      year: 2018,
      category: 'Best Director',
      event: 'South Indian International Movie Awards',
      eventLocation: 'Hyderabad, IN',
      verificationLink: 'https://simaawards.com/2018/winners',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ];
    return achievement;
  }
}
