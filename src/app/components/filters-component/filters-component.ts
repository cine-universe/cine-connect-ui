import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filters-component',
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './filters-component.html',
  styleUrl: './filters-component.scss',
})
export class FiltersComponent {
  // Form Models
  searchText: string = '';
  locationFilter: string = '';
  minRate: number | null = null;
  remoteOnly: boolean = false;

  // UI State Signals
  showFilters = signal<boolean>(false);
  
  // Data
  jobTypes = signal<string[]>(['Contractor', 'Freelancing', 'Full-time']);
  
  // Selection State
  selectedTypes = signal<string[]>([]);

  toggleFilters() {
    this.showFilters.update(v => !v);
  }

  toggleJobType(type: string) {
    this.selectedTypes.update(current => {
      if (current.includes(type)) {
        return current.filter(t => t !== type);
      } else {
        return [...current, type];
      }
    });
  }

  resetFilters() {
    this.searchText = '';
    this.locationFilter = '';
    this.minRate = null;
    this.remoteOnly = false;
    this.selectedTypes.set([]);
  }
}
