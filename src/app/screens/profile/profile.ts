import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile-service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ExperienceComponent } from '../../components/experience/experience';
import { Experience } from '../../models/Experience';
import { MobileHeader } from '../../components/mobile-header/mobile-header';
import { Description } from '../../components/about/description/description';
import { Skills } from '../../components/about/skills/skills';
import { AchievementsComponent } from '../../components/about/achievements/achievements';
import { Achievements } from '../../models/Achievements';

@Component({
  selector: 'app-profile',
  imports: [
    MatIconModule, 
    FormsModule, 
    ExperienceComponent,
    Description, 
    MobileHeader,
    Skills,
    AchievementsComponent
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  userProfile: any;
  posts: any;

  categories: string[] = [
    'About',
    'Posts',
    'Experience'
  ]

  selectedCategory: string = 'Posts';

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  experiences: Experience[] = [];
  achievements: Achievements[] = [];
  
  constructor(private profileService: ProfileService) { }
  
  ngOnInit() {
    this.userProfile = this.profileService.getUserProfile();
    this.posts = ['baahubali.jpg'];
    this.profileService.experience$.subscribe(exps => {
      this.experiences = exps
    });
    this.profileService.description$.subscribe(desc => {
      this.userProfile.bio = desc;
    });
    this.profileService.achivement$.subscribe(achs => {
      this.achievements = achs;
    })
  }

  onDescriptionUpdated(desc: string) {
    this.profileService.updateDescription(desc);
  }

  onExperienceUpdated(updated: Experience) {
    this.profileService.updateExperience(updated);
  }

  onExperienceAdded(added: Experience) {
    this.profileService.addExperience(added);
  }

  onExperienceDeleted(index: number) {
    this.profileService.deleteExperience(index);
  }

  onSkillAdded(newSkill: string) {
    this.userProfile.skills.push(newSkill);
  }
  onSkillDeleted(index: number) {
    this.userProfile.skills.splice(index, 1);
  }

  onAchievementUpdated(achievement: Achievements) {
    this.profileService.updateAchievement(achievement);
  }
  
  onAchievementAdded(achievement: Achievements) {
    this.profileService.addAchievement(achievement);
  }

  onAchievementDeleted(index: number) {
    this.profileService.deleteAchievement(index);
  }
}
