import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Experience } from '../../models/Experience';
import { DatePipe } from '@angular/common';
import { ExpForm } from '../exp-form/exp-form';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../delete-dialog/delete-dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-experience',
  imports: [MatIconModule, DatePipe, MatTooltipModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class ExperienceComponent {

  readonly dialog = inject(MatDialog); 
  @Input() experiences: Experience | any;
  @Output() experienceUpdated = new EventEmitter<Experience>();
  @Output() experienceAdded = new EventEmitter<Experience>();
  @Output() experienceDeleted = new EventEmitter<number>();

  openExperience(id: number) {
    this.dialog.open(ExpForm, {
      data: this.experiences.find((exp:Experience)=> exp.id === id),
      maxHeight: '500px',
      panelClass: 'custom-dialog-panel',
      backdropClass: 'custom-dialog-backdrop'
    }).afterClosed().subscribe((data) => {
      if(data != undefined && data!=null) {
        this.experienceUpdated.emit(data)
      }
    });
  }

  addExperience() {
    this.dialog.open(ExpForm, {
      data: [],
      maxHeight: '500px',
      panelClass: 'custom-dialog-panel',
      backdropClass: 'custom-dialog-backdrop'
    }).afterClosed().subscribe((data) => {
      if(data != undefined && data!=null) {
        this.experienceAdded.emit(data)
      }
    });
  }

  deleteExperience(experience: Experience) {
    this.dialog.open(DeleteDialog, {
      data: {
        category: 'experience',
        name: experience.projectTitle
      }
    }).afterClosed().subscribe((result) => {
      if(result) {
        this.experienceDeleted.emit(experience.id);
      }
    })
  }

  expandedIds = new Set<number | string>();

  isLongDescription(exp: any): boolean {
    const count = (exp?.description || '').trim().split(/\s/).filter(Boolean).length;
    return count > 10;
  }

  getShortDescription(exp: any): string {
    const words = (exp?.description || '').trim().split(/\s/).filter(Boolean);
    if (words.length <= 10) return exp?.description || '';
    return words.slice(0, 10).join(' ') + '...';
  }

  toggleExpand(id: number | string) {
    if (this.expandedIds.has(id)) this.expandedIds.delete(id);
    else this.expandedIds.add(id);
  }

  isExpanded(id: number | string) {
    return this.expandedIds.has(id);
  }
}