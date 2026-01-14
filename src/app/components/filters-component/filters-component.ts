import { CommonModule } from '@angular/common';
import { Component, signal, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export interface Filters {
  searchText: string;
  locationFilter: string;
  minRate: number | null;
  remoteOnly: boolean;
  jobTypes: string[];
}

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
  jobTypes = signal<string[]>(['Contract', 'Freelance', 'Full-Time']);
  
  // Selection State
  selectedTypes = signal<string[]>([]);

  @Output() filtersChange = new EventEmitter<Filters>();

  private searchTimeout: any = null;

  toggleFilters() {
    this.showFilters.update(v => !v);
  }

  onSearch(value: string) {
    // debounce to avoid emitting on every keystroke
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      // only emit after 3+ chars or when cleared to reset
      if (!value || value.length >= 3) {
        this.filtersChange.emit({
          searchText: value ? value.trim() : '',
          locationFilter: this.locationFilter,
          minRate: this.minRate,
          remoteOnly: this.remoteOnly,
          jobTypes: this.selectedTypes(),
        });
      }
    }, 250);
  }
  onLocationChange(value: string) {
    this.filtersChange.emit({
      searchText: this.searchText,
      locationFilter: value ? value.trim() : '',
      minRate: this.minRate,
      remoteOnly: this.remoteOnly,
      jobTypes: this.selectedTypes(),
    });
  }
  onMinRateChange(value: number | null) {
    this.filtersChange.emit({
      searchText: this.searchText,
      locationFilter: this.locationFilter,
      minRate: value,
      remoteOnly: this.remoteOnly,
      jobTypes: this.selectedTypes(),
    });
  }

  toggleJobType(type: string) {
    this.selectedTypes.update(current => {
      if (current.includes(type)) {
        return current.filter(t => t !== type);
      } else {
        return [...current, type];
      }
    });
    this.filtersChange.emit({
      searchText: this.searchText,
      locationFilter: this.locationFilter,
      minRate: this.minRate,
      remoteOnly: this.remoteOnly,
      jobTypes: this.selectedTypes(),
    });
  }

  resetFilters() {
    this.searchText = '';
    this.locationFilter = '';
    this.minRate = null;
    this.remoteOnly = false;
    this.selectedTypes.set([]);
    // notify parent to clear filters
    this.filtersChange.emit({
      searchText: '',
      locationFilter: '',
      minRate: null,
      remoteOnly: false,
      jobTypes: [],
    });
  }
}
