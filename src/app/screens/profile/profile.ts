import { Component, HostListener, OnDestroy } from '@angular/core';
import { ProfileService } from '../../services/profile-service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AchievementForm } from '../../components/achievement-form/achievement-form';
import { ExperienceComponent } from '../../components/experience/experience';
import { Experience } from '../../models/Experience';
import { MobileHeader } from '../../components/mobile-header/mobile-header';

@Component({
  selector: 'app-profile',
  imports: [MatIconModule, FormsModule, AchievementForm, ExperienceComponent, MobileHeader],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnDestroy {
  userProfile: any;
  posts: any;

  descriptionHeading='You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences.';

  // description edit dialog state
  isEditingDescription = false;
  editDescription = '';

  // skill edit/add dialog state
  skillsPopup = [];
  isRemovingSkill = false;
  addOrDel = '';
  newSkill = '';
  newSkillList: string[] = [];

  // achievement edit/add dialog state
  isEditingAchievement = false;
  addOrEdit = '';
  achievement = {};

  selectedPost: string | null = null;

  categories: string[] = [
    'About',
    'Posts',
    'Experience'
  ]

  selectedCategory: string = 'Posts';

  experiences: Experience[] = [];

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  constructor(private profileService: ProfileService) { }
  
  ngOnInit() {
    // Dummy user profile data
    this.userProfile = this.profileService.getUserProfile();
    this.posts = ['banner.jpg', 'baahubali.jpg'];
    this.profileService.experience$.subscribe(exps => {
      this.experiences = exps
    });
  }

  openPost(url: string) {
    this.selectedPost = url;
    // prevent background scroll while modal open
    try { document.body.style.overflow = 'hidden'; } catch {}
  }

  closePost() {
    this.selectedPost = null;
    try { document.body.style.overflow = ''; } catch {}
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEsc(event: Event) {
    const ke = event as KeyboardEvent;
    if (ke?.key === 'Escape' && this.selectedPost) {
      this.closePost();
    }
    if (ke?.key === 'Escape' && this.isEditingDescription) {
      this.cancelDescription();
    }
  }

  ngOnDestroy() {
    try { document.body.style.overflow = ''; } catch {}
  }

  // open description edit dialog
  openDescription() {
    this.editDescription = this.userProfile?.bio ?? '';
    this.isEditingDescription = true;
    try { document.body.style.overflow = 'hidden'; } catch {}
  }

  saveDescription() {
    this.userProfile = this.userProfile || {};
    this.userProfile.bio = (this.editDescription || '').trim();
    this.isEditingDescription = false;
    try { document.body.style.overflow = ''; } catch {}
  }

  cancelDescription() {
    this.isEditingDescription = false;
    this.editDescription = '';
    try { document.body.style.overflow = ''; } catch {}
  }
  
  // open skills edit dialog
  openSkills(operation: string) {
    if(operation==='del') {
      this.addOrDel = 'del';
      this.skillsPopup = (this.userProfile?.skills || []).slice();
    } else {
      this.addOrDel = 'add';
    }
    this.isRemovingSkill = true;
    try { document.body.style.overflow = 'hidden'; } catch {}
  }

  saveSkills(operation: string) {
    if(operation==='del') {
      this.userProfile.skills = this.skillsPopup.slice();
    } else {
      this.userProfile.skills.push(...this.newSkillList);
      this.newSkillList = [];
    }
    this.isRemovingSkill = false;
    try { document.body.style.overflow = ''; } catch {}
  }

  cancelSkills() {
    this.isRemovingSkill = false;
    this.skillsPopup = [];
    this.newSkillList = [];
    try { document.body.style.overflow = ''; } catch {}
  }

  removeSkill(index: number) {
    this.skillsPopup.splice(index, 1);
  }

  addSkill() {
    const trimmedSkill = this.newSkill.trim();
    if(trimmedSkill) {
      this.newSkillList.push(trimmedSkill);
      this.newSkill = '';
    }
  }

  removeNewSkill(index: number) {
    this.newSkillList.splice(index, 1);
  }
  
  // open achievement edit/add dialog
  openAchievement(operation: string, index: any) {
    if (operation === 'edit') {
      this.addOrEdit = 'edit';
      this.achievement = this.userProfile?.achievements?.find((a: any) => a.id === index) ?? {};
    } else {
      this.addOrEdit = 'add';
      this.achievement = {
        award: '',
        year: '',
        event: '',
        category: '',
        userId: this.userProfile.id
      };
    }
    this.isEditingAchievement = true;
    try { document.body.style.overflow = 'hidden'; } catch {}
  }

  // after edit/add modal saves an achievement
  onAchievementSaved(payload: any) {
    this.userProfile = this.userProfile || {};
    this.userProfile.achievements = this.userProfile.achievements || [];

    if (this.addOrEdit === 'edit') {
      const idx = this.userProfile.achievements.findIndex((a: any) => a.id === payload.id);
      if (idx > -1) {
        this.userProfile.achievements[idx] = payload;
      } else {
        this.userProfile.achievements.push(payload);
      }
    } else {
      this.userProfile.achievements.push(payload);
    }

    this.isEditingAchievement = false;
    this.achievement = {};
    try { document.body.style.overflow = ''; } catch {}
  }

  deleteAchievement(index: number) {
    this.userProfile.achievements=this.userProfile.achievements.filter((a: any) => a.id !== index);
  }

  cancelAchievements() {
    this.isEditingAchievement = false;
    this.achievement = {};
    try { document.body.style.overflow = ''; } catch {}
  }

  onExperienceUpdated(updated: Experience) {
    this.profileService.updateExperience(updated);
  }

  onExperienceAdded(added: Experience) {
    this.profileService.addExperience(added);
  }
}
