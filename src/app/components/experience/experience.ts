import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Experience, ProductionType } from '../../models/Experience';
import { DatePipe } from '@angular/common';
import { ExpForm } from '../exp-form/exp-form';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-experience',
  imports: [MatIconModule, DatePipe],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class ExperienceComponent {

  readonly dialog = inject(MatDialog); 
  @Input() experiences: Experience | any;

  // deletion state
  selectedToDelete: Experience | null = null;

  constructor(
  ) {}

  openExperience(id: number) {
    this.dialog.open(ExpForm, {
      data: this.experiences.find((exp:Experience)=> exp.id === id),
      maxHeight: '500px',
      panelClass: 'custom-dialog-panel',
      backdropClass: 'custom-dialog-backdrop'
    }).afterClosed().subscribe((data) => {
      if(data != undefined && data!=null) {
        this.experiences = this.experiences.map((e:Experience) => e.id===data.id ? data : e )
        console.log(this.experiences)
      }
    });
  }

  openDelete(exp: Experience) {
    this.selectedToDelete = exp;
    try { document.body.style.overflow = 'hidden'; } catch {}
  }

  confirmDelete() {
    if (!this.selectedToDelete) return;
    this.experiences = this.experiences.filter((e: Experience) => e.id !== this.selectedToDelete!.id);
    this.selectedToDelete = null;
    try { document.body.style.overflow = ''; } catch {}
  }

  cancelDelete() {
    this.selectedToDelete = null;
    try { document.body.style.overflow = ''; } catch {}
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