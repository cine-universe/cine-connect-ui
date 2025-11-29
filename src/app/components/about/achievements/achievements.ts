import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AchievementForm } from '../../achievement-form/achievement-form';
import { Achievements } from '../../../models/Achievements';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteDialog } from '../../delete-dialog/delete-dialog';

@Component({
  selector: 'app-achievements',
  imports: [
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './achievements.html',
  styleUrl: './achievements.scss',
})
export class AchievementsComponent {
  @Input() userAchievements: any[] = [];
  @Output() achievementUpdated = new EventEmitter<Achievements>();
  @Output() achievementAdded = new EventEmitter<Achievements>();
  @Output() achievementDeleted = new EventEmitter<number>();

  constructor(
    private readonly dialog: MatDialog
  ) {}

  openAchievement(achievement: Achievements) {
    this.dialog.open(AchievementForm, {
      data: achievement
    }).afterClosed().subscribe(result => {
      if (result != undefined && result !=null) {
        this.achievementUpdated.emit({...result, id : achievement.id, userId: achievement.userId})
      }
    });
  }

  addAchievement() {
    this.dialog.open(AchievementForm, {
      data: []
    }).afterClosed().subscribe(result => {
      if (result != undefined && result !=null) {
        this.achievementAdded.emit(result)
      }
    });
  }

  deleteAchievement(achievement: Achievements) {
    this.dialog.open(DeleteDialog, {
      data : {
        category: 'achievement',
        name: achievement.category
      }
    }).afterClosed().subscribe(result => {
      if(result) {
        this.achievementDeleted.emit(achievement.id);
      }
    })
  }
}
