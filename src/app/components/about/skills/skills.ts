import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SkillForm } from '../../skill-form/skill-form';
import { DeleteDialog } from '../../delete-dialog/delete-dialog';

@Component({
  selector: 'app-skills',
  imports: [
    MatIconModule,
    FormsModule
  ],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {

  readonly dialog = inject(MatDialog);
  @Input() userSkills: string[] = [];
  @Output() newSkill = new EventEmitter<string>();
  @Output() deletedSkillIndex = new EventEmitter<number>();

  addSkill() {
    this.dialog.open(SkillForm, {
      data: this.userSkills,
      width: '90%',
      maxHeight: '80vh',
      panelClass: 'custom-dialog-panel',
      backdropClass: 'custom-dialog-backdrop'
    }).afterClosed().subscribe(result => {
      if(result) {
        this.newSkill.emit(result);
      }
    });
  }

  deleteSkill(index: number, skill: string) {
    this.dialog.open(DeleteDialog, {
      data: {
        category: 'skill',
        name: skill
      }
    }).afterClosed().subscribe(result => {
      if(result) {
        this.deletedSkillIndex.emit(index);
      }
    });
  }
}
