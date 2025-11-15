import { Component, HostListener, OnDestroy } from '@angular/core';
import { ProfileService } from '../../services/profile-service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [MatIconModule, FormsModule],
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

  skillsPopup = [];
  isRemovingSkill = false;
  addOrDel = '';
  newSkill = '';
  newSkillList: string[] = [];

  selectedPost: string | null = null;

  categories: string[] = [
    'About',
    'Posts',
    'Experience'
  ]

  selectedCategory: string = 'Posts';

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  constructor(private profileService: ProfileService) { }
  
  ngOnInit() {
    // Dummy user profile data
    this.userProfile = this.profileService.getUserProfile();
    this.posts = ['banner.jpg', 'banner.jpg', 'baahubali.jpg','banner.jpg', 'banner.jpg', 'baahubali.jpg',
      'banner.jpg', 'banner.jpg', 'baahubali.jpg','banner.jpg', 'banner.jpg', 'baahubali.jpg',
      'banner.jpg', 'banner.jpg', 'baahubali.jpg','banner.jpg', 'banner.jpg', 'baahubali.jpg',
      'banner.jpg', 'banner.jpg', 'baahubali.jpg','banner.jpg', 'banner.jpg', 'baahubali.jpg',
      'banner.jpg', 'banner.jpg', 'baahubali.jpg','banner.jpg', 'banner.jpg', 'baahubali.jpg',
    ];
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
}
